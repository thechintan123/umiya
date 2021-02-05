from flask import jsonify, request
from . import app, db
from .auth import basic_auth, token_auth
from datetime import datetime
from .errors import error_response,  bad_request
from .models import User
from .email import send_forgotpwd_email
from strgen import StringGenerator


# basic auth or token auth is passed so user is now logged in
# return either a new token or an existing token back to Vue
# This is the route Vue calls when user first login
@app.route('/api/tokens', methods=['POST'])
@basic_auth.login_required
def get_token():
    user = basic_auth.current_user()
    data = request.get_json() or {}
    remember_me = data.get('remember_me')
    if remember_me:
        expiry = 604800 # 7 days token expiry
    else:
        expiry = 10 # 1 hour token expiry
    token = user.get_token(expires_in = expiry)
    payload = {
        'token': token,
        'email': user.email,
        'user_details_id': user.user_details.id,
        'role' : user.role.name,
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


# User forgot password
@app.route('/api/forgot_password/<email>', methods=['POST'])
def forgot_password(email):
    user = User.query.filter_by(email=email).first()
    if user:
        new_pwd = StringGenerator("[\d\w]{8}").render()
        if send_forgotpwd_email(user, new_pwd):
            user.set_password(new_pwd)
            db.session.add(user)
            db.session.commit()
            return '', 204
        else:
            return error_response(502, 'unable to send email')
    else:
        return error_response(400, "email doesn't exist")


# User change password
@app.route('/api/change_password', methods=['POST'])
# @basic_auth.login_required
def change_password():
    data = request.get_json() or {}
    current_password = data["currentPassword"]
    new_password = data["newPassword"]
    email = data["email"]
    user = User.query.filter_by(email=email).first()
    if user:
        # check old Password matches
        if user.check_password(current_password):
            user.set_password(new_password)
            db.session.add(user)
            db.session.commit()
            return '', 204
        else:
            return bad_request('Your entered current password does not match. Please check your current password.')


# testing
@app.route('/api/hello', methods=['GET'])
@token_auth.login_required
def hello():
    return jsonify({'message': 'hello world!!!'})
