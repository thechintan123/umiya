from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from .errors import error_response
from .models import User


basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()


@basic_auth.verify_password
def verify_password(email, password):
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return user


@basic_auth.error_handler
def basic_auth_error(status):
    return error_response(401,'Invalid credentials')


@token_auth.verify_token
def verify_token(token):
    return User.check_token(token) if token else None


@token_auth.error_handler
def auth_error():
    return error_response(401,'Invalid credentials')
