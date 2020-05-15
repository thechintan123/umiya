from flask import Flask
from config import Config
from flask_cors import CORS

app = Flask(__name__, static_folder='../../dist/spa', static_url_path='/')
app.config.from_object(Config)

CORS(app)

from app import routes
