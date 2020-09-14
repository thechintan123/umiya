from flask import Flask
from config import Config
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__, static_folder='../../dist/spa', static_url_path='/')

app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db, compare_type=True)

# You may need CORS if you are accessing Flask from Vue using Vue's server
# In Production you will not need this
# cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:8080"}})
CORS(app)

from . import route_search, route_token, route_user, errors, auth, models, route_test