from flask import jsonify
from . import app, db
from .auth import basic_auth, token_auth
from datetime import datetime


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
        'token': token,
        'email': user.email,
        'user_details_id': user.user_details.id
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


# testing
@app.route('/api/hello', methods=['GET'])
@token_auth.login_required
def hello():
    return jsonify({'message': 'hello world!!!'})

