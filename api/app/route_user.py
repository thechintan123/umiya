from flask import jsonify, request, url_for, Response
from . import app, db
from .auth import token_auth
from .errors import bad_request
from datetime import datetime
from .models import User, UserDetails, Country, Gotra, WhereKnow, MaritalStatus, Gender, UploadPhotos
from .email import send_reg_email
from PIL import Image
from strgen import StringGenerator
import re
from io import BytesIO
# workaround needed on Pythonanywhere
from werkzeug.wsgi import FileWrapper
from sqlalchemy import exc


# get one user
@app.route('/api/users/<int:id>', methods=['GET'])
#@token_auth.login_required
def get_user(id):
    user_det = UserDetails.query.get_or_404(id)
    return jsonify(user_det.to_dict())


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
        return bad_request('Please provide all mandatory fields.')
    if 'id' not in data['gotra'] or \
       'id' not in data['sourceOfWebsite'] or 'id' not in data['maritalStatus'] or \
       'id' not in data['gender']:
          return bad_request('Please provide all mandatory fields.')
    email = data['email'].lower()
    if re.match('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$', email) is None:
        return bad_request('Email provided is not valid')
    if User.query.filter_by(email=data['email']).first():
        return bad_request('Email already registered. Please use another email ID.')

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
    user_det = UserDetails(
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
    height=data['heightCms'],
    gotra=gotra,
    original_surname=data['originalSurname'],
    father_fullname=data['fatherName'],
    address=data['residentialAddress'],
    about_yourself=data['aboutYourself'],
    partner_age_from=data['ageFrom'],
    partner_age_to=data['ageTo'],
    partner_height_from=data['heightFromCms'],
    partner_height_to=data['heightToCms'],
    where_know=where_know
    )

    user = User(
    email=email
    )
    user.set_password(data['password'])
    user.user_details = user_det

    for pms in data['maritalStatusPreference']:
        try:
            ms = MaritalStatus.query.filter_by(id=int(pms['id'])).first()
            user_det.partner_marital_status.append(ms)
        except exc.SQLAlchemyError as e:
            print('Error', type(e))
    db.session.add(user)
    db.session.add(user_det)
    db.session.commit()

    payload = {'user_details_id': user_det.id}
    #user_details_id is profile ID visible on screen
    response = jsonify(payload)
    response.status_code = 201
    # the HTTP protocol requires that a 201 response includes a Location header that is set to the URL of the new resource
    response.headers['Location'] = url_for('get_user', id=user.id)
    # send welcome email to user
    send_reg_email(user)
    return response


 # update user
@app.route('/api/users/<int:id>', methods=['PUT'])
@token_auth.login_required
def update_user(id):
    user_det = UserDetails.query.get_or_404(id)
    data = request.get_json() or {}
    for key in data:
        if hasattr(user_det, key) and data[key] is not None:
            setattr(user_det, key, data[key])
    user_det.update_date = datetime.utcnow()
    db.session.add(user_det)
    db.session.commit()
    return jsonify(user_det.to_dict())


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
    if 'user_detials_id' not in request.form:
        return bad_request('Missing user_detials_id')
    user_detials_id = str(request.form.get('user_detials_id')) 
    #user_det = db.session.query(UserDetails).join(User).filter(User.id == user_id).first()
    user_det = db.session.query(UserDetails).filter(UserDetails.id == user_detials_id).first()
    if not user_det:
        return bad_request('User details does not exist')
    folder = app.config['UPLOAD_FOLDER'] / user_detials_id
    if not folder.is_dir():
            folder.mkdir()
    filename = StringGenerator("[\d\w]{10}").render() 
    truncated_filename = filename[0:5] + ".jpg"
    if filetype == 'photo':
        filename = 'photo_' + user_detials_id + '_' + user_det.first_name + '_' + truncated_filename
    elif filetype == 'proof':
        filename = 'proof_' + user_detials_id + '_'  + user_det.first_name + '_' + truncated_filename
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