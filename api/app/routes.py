from flask import jsonify, request, url_for, render_template
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


## Search Function
@app.route('/api/search', methods=['POST'])
def search():
    data = request.get_json() or {}
    #print('data from form:', data["country"][0])
    #country = data["country"][0]
    #print('country:', country["id"])
    country_id_local = []
    countries = data.get("country")
    if countries is not None:
        for country in countries:
            country_id_local.append(country["id"])
    else:
        print('Country Else')
        country_id_local.append(81)
    #81 - Country Code in DB table for India
    print('country_id_local:', country_id_local)
    martial_status_id_local = []
    maritalStatusPreferences = data.get("maritalStatusPreference")
    if len(maritalStatusPreferences) != 0:
        for maritalStatus in maritalStatusPreferences:
            martial_status_id_local.append(maritalStatus["id"])
    else:
        # 1,2,3,4 - all marital statuses in DB values
        martial_status_id_local.extend([1, 2, 3, 4])
    print('martial_status_id_local:', martial_status_id_local)
    currDate = datetime.now()
    print('Current Date', currDate)
    ageFromTo = data["ageFromTo"]
    if ageFromTo is not None:
        ageMin = ageFromTo.get("min")
        ageMax = ageFromTo.get("max")
    else:
        ageMin = 18
        ageMax = 50
    print('Age Min and Max', ageMin, ageMax)
    currDatePlusMin = currDate - timedelta(days=(ageMin*365))
    currDatePlusMax = currDate - timedelta(days=(ageMax*365))
    print('current Date Plus', currDatePlusMin, currDatePlusMax)
    #5ft × 30.48 + 5 in × 2.54= 165.1 cm
    heightMin = data.get("heightFrom")
    print('heightMin', heightMin)
    if heightMin is None or heightMin == '':
      heightMin = "4 ft 0 inches"
    heightMax = data.get("heightTo")
    if heightMax is None or heightMax == '':
      heightMax = "7 ft 0 inches"
    heightMinInCms = convertToCms(heightMin)
    heightMaxInCms = convertToCms(heightMax)
    print('Height Min Max', heightMinInCms, heightMaxInCms)
    lookingFor = data.get("lookingFor")
    if lookingFor is None or lookingFor == '':
      lookingFor = 2  # 2 is Looking fór Bride
    print('lookingFor', lookingFor)
    #print('data from country:', data.get("country"))
    #Write Query
    #users1 = UserDetails.query.filter_by(country_id = country_id_local).all()
    users = UserDetails.query.filter(and_(UserDetails.country_id.in_(country_id_local),
                                          UserDetails.gender_id == lookingFor),
                                     UserDetails.dob <= currDatePlusMin, UserDetails.dob >= currDatePlusMax,
                                     UserDetails.height.between(
                                         heightMinInCms, heightMaxInCms),
                                     UserDetails.marital_status_id.in_(martial_status_id_local)).all()
    print('data from users', users)
    #Get List of Objects
    #Convert list to Jsonify format
    userList = []
    for user in users:
        userList.append({'id': user.id, 'firstName': user.first_name,
                         'lastName': user.last_name,
                         'gender': user.gender.name,
                         'dob': user.dob,
                         'country': user.country.name,
                         'state': user.state,
                         'city': user.city,
                         'phonePrimary': user.phone_primary,
                         'phoneAlternate': user.phone_alternate,
                         'maritalStatus': user.marital_status.name,
                         'height': user.height,
                         'gotra': user.gotra.name,
                         'originalSurname': user.original_surname,
                         'fatherFullname': user.father_fullname,
                         'address': user.address,
                         'aboutYourself': user.about_yourself
                         })  # Need to work on BackReference
    response = jsonify(userList)
    response.status_code = 201
    # response.headers['Location'] = url_for('get_user', id=user.id)
    return response


# get one user
@app.route('/api/users/<int:id>', methods=['GET'])
@token_auth.login_required
def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())


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

    # Create db objects
    user_details = UserDetails(
        first_name=data['firstName'],
        last_name=data['lastName'],
        gender=gender,
        dob=data['dateOfBirth'],
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
        email=data['email']
    )
    user.set_password(data['password'])
    user.user_details = user_details

    for pms in data['maritalStatusPreference']:
        ms = MaritalStatus.query.filter_by(id=int(pms['id'])).first()
        user_details.partner_marital_status.append(ms)

    db.session.add(user)
    db.session.add(user_details)
    db.session.commit()

    payload = {'email': user.email}
    response = jsonify(payload)
    response.status_code = 201

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
@token_auth.login_required
def upload_file():
    if 'filetype' not in request.form:
        return bad_request('Missing filetype')
    filetype = request.form.get('filetype')
    if (filetype not in ['photo', 'proof']):
        return bad_request('Wrong file type')
    if 'file' not in request.files:
        return bad_request('No file part')

    user_id = str(token_auth.current_user().id)
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

    user_det = token_auth.current_user().user_details
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


# testing
@app.route('/api/hello', methods=['GET'])
@token_auth.login_required
def hello():
    return jsonify({'message': 'hello world!!!'})

