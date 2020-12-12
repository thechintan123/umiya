from flask import jsonify, request, url_for, Response
from . import app, db
from .auth import basic_auth, token_auth
from .errors import bad_request, error_response
from datetime import datetime
from .models import User, UserDetails, Country, Gotra, WhereKnow, MaritalStatus, Gender, UploadPhotos, ProfileStatus
from .email import send_reg_email, send_match_email, send_update_status_email
from PIL import Image
from strgen import StringGenerator
import re
from io import BytesIO
# workaround needed on Pythonanywhere
from werkzeug.wsgi import FileWrapper


# get one user
@app.route('/api/users/<int:id>', methods=['GET'])
@token_auth.login_required
def get_user(id):
    user_det = UserDetails.query.get_or_404(id)
    curr_user = token_auth.current_user()
    if curr_user.user_details.id != id:
        return error_response('401', 'You are not authorised')
    return jsonify(user_det.to_dict())

# get user - selected by admin
@app.route('/api/admin/users/<int:id>', methods=['GET'])
@token_auth.login_required(role='admin')
def get_user_by_admin(id):
    user_det = UserDetails.query.get_or_404(id)
    return jsonify(user_det.to_dict())    


# add new user
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}

    mand_fields = ('email', 'password', 'first_name', 'last_name', 'gender', 'date_of_birth',
                   'country', 'state', 'city', 'primary_contact', 'agree_tc', 'marital_status',
                   'height_cms', 'gotra', 'original_surname', 'father_name', 'residential_address',
                   'partner_age_from', 'partner_age_to', 'partner_height_from_cms', 'partner_height_to_cms',
                   'where_know')

    if not all(field in data for field in mand_fields):
        return bad_request('Please provide all mandatory fields')
    if 'id' not in data['gotra'] or \
       'id' not in data['where_know'] or \
       'id' not in data['marital_status'] or \
       'id' not in data['gender']:
        return bad_request('Please provide all mandatory fields')

    email = data['email'].lower()
    if re.match('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$', email) is None:
        return bad_request('Email provided is not valid')
    if User.query.filter_by(email=data['email']).first():
        return bad_request('Email already registered. Please use another email ID.')
    data['email'] = email

    user_det = UserDetails()
    user_det.from_dict(data=data, new_user=True)
    db.session.commit()

    payload = {'user_details_id': user_det.id}
    response = jsonify(payload)
    response.status_code = 201
    # the HTTP protocol requires that a 201 response includes a Location header that is set to the URL of the new resource
    response.headers['Location'] = url_for('get_user', id=user_det.id)
    # send welcome email to user
    send_reg_email(user_det.user)
    return response


# update user
@app.route('/api/users/<int:id>', methods=['PUT'])
@token_auth.login_required
def update_user(id):
    user_det = UserDetails.query.get_or_404(id)
    curr_user = token_auth.current_user()
    if curr_user.user_details.id != id:
        return error_response(401, 'You are not authorised')
    data = request.get_json() or {}
    user_det.from_dict(data=data)
    db.session.commit()
    return jsonify(user_det.to_dict())


# update user by admin
@app.route('/api/admin/users/<int:id>', methods=['PUT'])
@token_auth.login_required(role='admin')
def admin_update_user(id):
    user_det = UserDetails.query.get_or_404(id)
    data = request.get_json() or {}
    user_det.from_dict(data=data)
    db.session.commit()
    if 'status' in data:
        send_update_status_email(user_det.user)
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
    profile_status = get_list(ProfileStatus)
    payload = {'country': country, 'gotra': gotra, 'where_know': where_know,
               'marital_status': marital_status, 'gender': gender, 'profile_status': profile_status}
    return jsonify(payload)


# handle photo uploads
@app.route('/api/photos', methods=['POST'])
def upload_photo():
    if 'filetype' not in request.form:
        return bad_request('Missing filetype')
    filetype = request.form.get('filetype')
    if (filetype not in ['photo', 'proof']):
        return bad_request('Wrong file type')
    if 'file' not in request.files:
        return bad_request('No file part')
    if 'user_details_id' not in request.form:
        return bad_request('Missing user_details_id')
    user_details_id = str(request.form.get('user_details_id'))
    #user_det = db.session.query(UserDetails).join(User).filter(User.id == user_id).first()
    user_det = db.session.query(UserDetails).filter(
        UserDetails.id == user_details_id).first()
    if not user_det:
        return bad_request('User details does not exist')
    folder = app.config['UPLOAD_FOLDER'] / user_details_id
    if not folder.is_dir():
        folder.mkdir()
    filename = StringGenerator("[\d\w]{10}").render()
    truncated_filename = filename[0:5] + ".jpg"
    if filetype == 'photo':
        filename = 'photo_' + user_details_id + '_' + \
            user_det.first_name + '_' + truncated_filename
    elif filetype == 'proof':
        filename = 'proof_' + user_details_id + '_' + \
            user_det.first_name + '_' + truncated_filename
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
@app.route('/api/photos/<int:id>/<string:filename>', methods=['GET'])
def get_photo(id, filename):
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


# delete photo from database and folder
@app.route('/api/photos/<int:id>/<string:filename>', methods=['DELETE'])
@token_auth.login_required
def delete_photo(id, filename):
    UserDetails.query.get_or_404(id)
    # curr_user = token_auth.current_user()
    # if curr_user.user_details.id != id:
    #     return error_response(401, 'You are not authorised')

    user_det_upl_proof = db.session.query(UserDetails) \
        .filter(UserDetails.upload_proof == filename) \
        .filter(UserDetails.id == id) \
        .first()
    upload_photos = UploadPhotos.query \
        .filter(UploadPhotos.filename == filename) \
        .filter(UploadPhotos.user_details_id == id) \
        .all()
    if user_det_upl_proof is None and not upload_photos:
        return error_response(404, 'Photo not found in database')
    if user_det_upl_proof is not None:
        user_det_upl_proof.upload_proof = None
        db.session.add(user_det_upl_proof)
    if upload_photos:
        for p in upload_photos:
            db.session.delete(p)

    folder = app.config['UPLOAD_FOLDER'] / str(id)
    if not folder.is_dir():
        return bad_request('Upload folder not found')
    file_path = folder / filename

    try:
        file_path.unlink()
    except OSError as e:
        return bad_request('Unable to delete photo')
    db.session.commit()

    # 204 - successful and no body
    return '', 204


@app.route('/api/batch-notification', methods=['POST'])
@basic_auth.login_required(role='email')
def batch_notification():
    user_id = request.json['user_id']
    match_users_id = request.json['match_users_id']
    new_match_users_id = request.json['new_match_users_id']

    if user_id is None or new_match_users_id is None:
        return bad_request('Mandatory data was missing')
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return bad_request('User id is not valid')
    new_match_users = []
    for mid in new_match_users_id:
        m = User.query.filter_by(id=mid).first()
        if m is not None:
            new_match_users.append(m)        
    match_users = []
    for mid in match_users_id:
        m = User.query.filter_by(id=mid).first()
        if m is not None:
            match_users.append(m)
    if not new_match_users:
        return bad_request("Match user id's are invalid")
    send_match_email(user, match_users, new_match_users)
    return '', 204
