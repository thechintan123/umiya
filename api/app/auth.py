from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from .errors import error_response
from .models import User


basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

# this funcion receives the username, password sent by Vue
# If valid it will return a user object.
# You can then access the user object via current_user()
@basic_auth.verify_password
def verify_password(email, password):
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return user

# this function is called if there is an error with basic authentication
@basic_auth.error_handler
def basic_auth_error(status):
    # It is actually 401 error, but we use 400 so that browser doesnt do their autopopup
    return error_response(400,'Invalid credentials')

# this funcion receives the token sent by Vue
# If valid it will return a user object
# You can then access the user object via current_user()
@token_auth.verify_token
def verify_token(token):
    return User.check_token(token) if token else None

# this function is called if there is an error with token authentication
@token_auth.error_handler
def auth_error():
    # It is actually 401 error, but we use 400 so that browser doesnt do their autopopup
    return error_response(400,'Invalid credentials')
