import os
from dotenv import load_dotenv
from pathlib import Path

# handy to have - makes referencing files on local system each
basedir = Path(__file__).parent
load_dotenv(basedir / '.env')

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS=False

    # Image upload config
    UPLOAD_FOLDER = basedir / 'uploads'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    # Max 3 MB
    MAX_CONTENT_LENGTH = 3 * 1024 * 1024     
