import os
from dotenv import load_dotenv
from pathlib import Path

# handy to have - makes referencing files on local system each
basedir = Path(__file__).parent
load_dotenv(basedir / '.env')


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # recommended by Pythonanywhere otherwise you get mysql timeout
    SQLALCHEMY_POOL_RECYCLE = 299

    # Image upload config
    UPLOAD_FOLDER = basedir / 'uploads'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    # Max 3 MB
    MAX_CONTENT_LENGTH = 3 * 1024 * 1024

    # Sendgrid settings
    SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY')
    MAIL_FROM = os.environ.get('MAIL_FROM')
    MAIL_ADMINS = os.environ.get('MAIL_ADMINS')
    MAIL_REPLY_TO = os.environ.get('MAIL_REPLY_TO')
