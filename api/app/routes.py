from flask import jsonify, request, url_for, render_template, Response
from . import app, db
from .auth import basic_auth, token_auth
from .errors import error_response, bad_request
from werkzeug.utils import secure_filename
from sqlalchemy import and_
from datetime import datetime, timedelta
from .models import User, UserDetails, Role, Country, Gotra, WhereKnow, MaritalStatus, Gender, UploadPhotos
from .email import send_reg_email
import os
from datetime import datetime
from PIL import Image
from strgen import StringGenerator
import re
from io import BytesIO
# workaround needed on Pythonanywhere
from werkzeug.wsgi import FileWrapper



# Serve the Vue file
@app.route('/')
def index():
    return app.send_static_file('index.html')


# basic auth or token auth is passed so user is now logged in
# return either a new token or an existing token back to Vue
# This is the route Vue calls when user first login
@app.route('/api/tokens', methods=['POST'])
@basic_auth.login_required
def get_token():
    user = basic_auth.current_user()
    token = user.get_token()
    payload = {
        'token': token
    }
    user.last_login = datetime.utcnow()
    db.session.add(user)
    db.session.commit()
    return jsonify(payload)


# revoke a token immediately .. eg when user logs out
@app.route('/api/tokens', methods=['DELETE'])
@token_auth.login_required
def revoke_token():
    token_auth.current_user().revoke_token()
    db.session.commit()
    # 204 - successful and no body
    return '', 204


# helper function for search
def convertToCms(heightInFootInches):
    slice_object1 = slice(0, 1)
    heightFt = heightInFootInches[slice_object1]
    slice_object2 = slice(5, 7)
    heightInches = heightInFootInches[slice_object2]
    print('Height Ft Inch', heightFt, heightInches)
    heightCms = float(heightFt) * 30.48 + float(heightInches) * 2.54
    return heightCms


# search Function
@app.route('/api/search', methods=['POST'])
def search():
    data = request.get_json() or {}

    country_id_local = []
    countries = data.get("country")
    if countries is not None:
        for country in countries:
            country_id_local.append(country['id'])
    else:
        # otherwise default to India
        india = Country.query.filter_by(name='India').first()
        country_id_local.append(india.id)
    
    marital_status_id_local =[]
    maritalStatusPreferences = data.get('maritalStatusPreference')
    if len(maritalStatusPreferences) != 0:
        for maritalStatus in maritalStatusPreferences:
            marital_status_id_local.append(maritalStatus['id'])
    else:
        # otherwise default to all marital status
        ms = MaritalStatus.query.all()
        marital_status_id_local = [m.id for m in ms]
        
    currDate = datetime.now()
    ageFromTo = data["ageFromTo"]
    if ageFromTo is not None:
        ageMin = ageFromTo.get("min")
        ageMax = ageFromTo.get("max")
    else:
        ageMin = 18
        ageMax = 50

    # Chintan to fix
    currDatePlusMin = currDate - timedelta(days=(ageMin*365))
    currDatePlusMax = currDate - timedelta(days=(ageMax*365))
    #print('current Date Plus', currDatePlusMin, currDatePlusMax)
    #5ft × 30.48 + 5 in × 2.54= 165.1 cm
    heightMin = data.get("heightFrom")
    #print('heightMin', heightMin)
    if heightMin is None or heightMin == '':
        heightMin = "4 ft 0 inches"
    heightMax = data.get("heightTo")
    if heightMax is None or heightMax == '':
        heightMax = "7 ft 0 inches"
    heightMinInCms = convertToCms(heightMin)
    heightMaxInCms = convertToCms(heightMax)
    #print('Height Min Max', heightMinInCms, heightMaxInCms)

    lookingFor = data.get("lookingFor")
    if lookingFor is None or lookingFor == '':
        # default to bride if empty
        female = Gender.query.filter_by(name="Female").first()
        lookingFor = female.id
    else:
        lookingFor = int(lookingFor)
        
    users = UserDetails.query.filter(and_(UserDetails.country_id.in_(country_id_local),\
                                          UserDetails.gender_id == lookingFor), \
                                          UserDetails.dob <= currDatePlusMin, UserDetails.dob >= currDatePlusMax, \
                                          UserDetails.height.between(heightMinInCms, heightMaxInCms), \
                                          UserDetails.marital_status_id.in_(marital_status_id_local)).all()

    userList = []
    for user in users:
        upload_photos = user.upload_photos.all()
        filenames = [u.filename for u in upload_photos]
        userList.append({'id': user.id, 'firstName': user.first_name, \
                        'lastName': user.last_name, \
                        'gender' : user.gender.name, \
                        'dob' : user.dob,\
                        'country' : user.country.name, \
                        'state' : user.state, \
                        'city' : user.city,\
                        'phonePrimary' : user.phone_primary, \
                        'phoneAlternate': user.phone_alternate, \
                        'maritalStatus' : user.marital_status.name, \
                        'height' : user.height, \
                        'gotra' : user.gotra.name,\
                        'originalSurname' : user.original_surname, \
                        'fatherFullName' : user.father_fullname, \
                        'address' : user.address, \
                        'aboutYourself': user.about_yourself, \
                        'uploadProof': user.upload_proof, \
                        'uploadPhotos': filenames \
                        }) 
    return jsonify(userList)


# get one user
@app.route('/api/users/<int:id>', methods=['GET'])
@token_auth.login_required
def get_user(id):
    pass
    #return jsonify(User.query.get_or_404(id).to_dict())


# helper function for add new user
def get_row(table, id):
    return table.query.filter_by(id=id).first()


# add new user
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}

    # tuple of mandatory fields
    mand_fields = ('email', 'password', 'firstName', 'lastName', 'gender', 'dateOfBirth',
                   'country', 'state', 'city', 'primaryContact', 'agreeTnC', 'maritalStatus',
                   'height', 'gotra', 'originalSurname', 'fatherName', 'residentialAddress',
                   'ageFrom', 'ageTo', 'heightTo', 'heightFrom',
                   'sourceOfWebsite')
    if not all(field in data for field in mand_fields):
        return bad_request('must include all mandatory fields in database')
    if 'id' not in data['gotra'] or \
        'id' not in data['sourceOfWebsite'] or 'id' not in data['maritalStatus'] or \
            'id' not in data['gender']:
        return bad_request('must include all mandatory fields in database')
    
    email = data['email'].lower()
    if re.match('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$', email) is None:
        return bad_request('Email provided is not valid')
    if User.query.filter_by(email=data['email']).first():
        return bad_request('email already registered')

    # Get objects from the dropdowns
    country = ''
    if data['country'] == 'India':
        country = Country.query.filter_by(name='India').first()
    else:
        if 'otherCountry' not in data:
            return bad_request('must include all mandatory fields in database')
        if 'id' not in data['otherCountry']:
            return bad_request('must include all mandatory fields in database')
        country = get_row(Country, int(data['otherCountry']['id']))
    gotra = get_row(Gotra, int(data['gotra']['id']))
    where_know = get_row(WhereKnow, int(data['sourceOfWebsite']['id']))
    marital_status = get_row(MaritalStatus, int(data['maritalStatus']['id']))
    gender = get_row(Gender, int(data['gender']['id']))
    dob = datetime.strptime(data['dateOfBirth'], '%Y-%m-%d')

    # Create db objects
    user_details = UserDetails(
        first_name=data['firstName'],
        last_name=data['lastName'],
        gender=gender,
        dob=dob,
        country=country,
        state=data['state'],
        city=data['city'],
        phone_primary=data['primaryContact'],
        phone_alternate=data['alternateContact'],
        agree_tc=data['agreeTnC'],
        marital_status=marital_status,
        height=data['height'],
        gotra=gotra,
        original_surname=data['originalSurname'],
        father_fullname=data['fatherName'],
        address=data['residentialAddress'],
        about_yourself=data['aboutYourself'],
        partner_age_from=data['ageFrom'],
        partner_age_to=data['ageTo'],
        partner_height_from=data['heightFrom'],
        partner_height_to=data['heightTo'],
        where_know=where_know
    )

    user = User(
        email=email
    )
    user.set_password(data['password'])
    user.user_details = user_details

    for pms in data['maritalStatusPreference']:
        ms = MaritalStatus.query.filter_by(id=int(pms['id'])).first()
        user_details.partner_marital_status.append(ms)

    db.session.add(user)
    db.session.add(user_details)
    db.session.commit()

    payload = {'user_id': user.id}
    response = jsonify(payload)
    response.status_code = 201
    # the HTTP protocol requires that a 201 response includes a Location header that is set to the URL of the new resource
    response.headers['Location'] = url_for('get_user', id=user.id)
    # send welcome email to user
    send_reg_email(user)
    return response


# helper function for dropdowns
def get_list(table):
    results = table.query.all()
    l = []
    for r in results:
        l.append({'id': r.id, 'name': r.name})
    return l


# Get dropdowns
@app.route('/api/lists', methods=['GET'])
def lists():
    payload = {}
    country = get_list(Country)
    gotra = get_list(Gotra)
    where_know = get_list(WhereKnow)
    marital_status = get_list(MaritalStatus)
    gender = get_list(Gender)
    payload = {'country': country, 'gotra': gotra, 'where_know': where_know,
               'marital_status': marital_status, 'gender': gender}
    return jsonify(payload)


# handle file uploads
@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'filetype' not in request.form:
        return bad_request('Missing filetype')
    filetype = request.form.get('filetype')
    if (filetype not in ['photo', 'proof']):
        return bad_request('Wrong file type')
    if 'file' not in request.files:
        return bad_request('No file part')
    
    if 'user_id' not in request.form:
        return bad_request('Missing user id')
    user_id = str(request.form.get('user_id')) 
    user_det = db.session.query(UserDetails).join(User).filter(User.id == user_id).first()
    if not user_det:
        return bad_request('User details does not exist')

    folder = app.config['UPLOAD_FOLDER'] / user_id
    if not folder.is_dir():
        folder.mkdir()

    filename = StringGenerator("[\d\w]{10}").render() + ".jpg"
    if filetype == 'photo':
        filename = 'photo_' + filename
    elif filetype == 'proof':
        filename = 'proof_' + filename
    try:
        # this is the max size, aspect ratio is maintained
        size = (1800, 1800)
        img = Image.open(request.files['file'].stream)
        # need to convert it for png format otherwise wont convert to jpg
        img = img.convert('RGB')
        img.thumbnail(size)
        img.save(folder / filename)
    except IOError as e:
        return bad_request('Unable to convert and save file')

    if filetype == 'photo':
        upl_photo = UploadPhotos(filename=filename)
        user_det.upload_photos.append(upl_photo)
        db.session.add(user_det)
        db.session.add(upl_photo)
        db.session.commit()
    elif filetype == 'proof':
        user_det.upload_proof = filename
        db.session.add(user_det)
        db.session.commit()

    # 204 - successful and no body
    return '', 204


# return uploaded photos for a user
@app.route('/api/upload/<int:id>/<string:filename>', methods=['GET'])
def get_upload(id, filename): 
    folder = app.config['UPLOAD_FOLDER'] / str(id)
    if not folder.is_dir():
        return bad_request('Upload folder not found')
    file_path = folder / filename

    try:
        # get PIL image
        img = Image.open(file_path)
        file_object = BytesIO()
        img.save(file_object, 'JPEG')
        file_object.seek(0)
        w = FileWrapper(file_object)
        return Response(file_object, mimetype='image/jpeg', direct_passthrough=True)
    except IOError as e:
        return bad_request('Unable to open file')


# testing
@app.route('/api/hello', methods=['GET'])
@token_auth.login_required
def hello():
    return jsonify({'message': 'hello world!!!'})

