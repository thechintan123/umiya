import os
from dotenv import load_dotenv
from pathlib import Path

# handy to have - makes referencing files on local system each
basedir = Path(__file__).parent
load_dotenv(basedir / '.env')

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
