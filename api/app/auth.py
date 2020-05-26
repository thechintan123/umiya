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
    # It is actually 401 error, but we use 400 so that browser doesnt do their autopopup
    return error_response(400,'Invalid credentials')


@token_auth.verify_token
def verify_token(token):
    return User.check_token(token) if token else None


@token_auth.error_handler
def auth_error():
    # It is actually 401 error, but we use 400 so that browser doesnt do their autopopup
    return error_response(400,'Invalid credentials')
