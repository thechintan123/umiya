from flask import jsonify, request, url_for, g
from . import app, db
from .auth import basic_auth, token_auth
from .errors import error_response, bad_request
from .models import User, Role


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/tokens', methods=['POST'])
@basic_auth.login_required
def get_token():
    token = basic_auth.current_user().get_token()
    payload = { \
        'email': basic_auth.current_user().email, \
        'token': token \
    }
    db.session.commit()
    return jsonify(payload)


@app.route('/api/tokens', methods=['DELETE'])
@token_auth.login_required
def revoke_token():
    token_auth.current_user().revoke_token()
    db.session.commit()
    # 204 - successful and no body
    return '', 204


@app.route('/api/users/<int:id>', methods=['GET'])
@token_auth.login_required
def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())


@app.route('/api/users', methods=['POST'])
def register():
    data = request.get_json() or {}
    if 'email' not in data or 'password' not in data:
        return bad_request('must include email and password fields')
    if User.query.filter_by(email=data['email']).first():
        return bad_request('please use a different email address')
    user = User(email=data['email'])
    user.set_password(data['password'])
    # also adds token to user session
    token = user.get_token() 
    db.session.add(user)
    db.session.commit()
    
    payload = { \
        'email': user.email, \
        'token': token \
    }
    response = jsonify(payload)
    response.status_code = 201
    # response.headers['Location'] = url_for('get_user', id=user.id)
    return response


@app.route('/api/hello', methods=['GET'])
@token_auth.login_required
def hello():
    return jsonify({'message': 'hello world!!!'})


