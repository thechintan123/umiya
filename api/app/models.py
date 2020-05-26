from flask import current_app
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
import jwt
from datetime import datetime, timedelta


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(100))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), default=2, nullable=False)
    update_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    create_date = db.Column(db.DateTime,default=datetime.utcnow, nullable=False)
    token = db.Column(db.String(140), index=True, unique=True)
    token_expiration = db.Column(db.DateTime)

    def __init__(self,**kwargs):
        # also call parent constructor
        super(User, self).__init__(**kwargs)
        self.role = Role.query.filter_by(name='user').first()

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_token(self, expires_in=3600):
        now = datetime.utcnow()
        if self.token and self.token_expiration > now + timedelta(seconds=60):
            return self.token
        payload = {'user': self.id, 'exp': now + timedelta(seconds=expires_in)}
        # decode('utf-8') converts token to string
        self.token = jwt.encode(
            payload, current_app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')
        self.token_expiration = now + timedelta(seconds=expires_in)
        db.session.add(self)
        return self.token

    def revoke_token(self):
        self.token_expiration = datetime.utcnow() - timedelta(seconds=1)

    def check_token(token):
        user = User.query.filter_by(token=token).first()
        if user is None or user.token_expiration < datetime.utcnow():
            return None
        return user

    @staticmethod
    def verify_token(token):
        try:
            id = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])['reset_password']
        except:
            return
        return User.query.get(id)

    def __repr__(self):
        return '<User {}>'.format(self.email)


class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    users = db.relationship('User', backref='role', lazy='dynamic')

    def __repr__(self):
        return '<Role {}>'.format(self.name)


user_marital = db.Table('user_marital',
    db.Column('user_details_id', db.Integer, db.ForeignKey('user_details.id'), primary_key=True),
    db.Column('marital_status_id', db.Integer, db.ForeignKey('marital_status.id'), primary_key=True)
)


class UserDetails(db.Model):
    __tablename__ = 'user_details'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.Enum('m', 'f'), nullable=False)
    dob = db.Column(db.String(10), nullable=False)
    country_id = db.Column(db.Integer, nullable=False)
    state_india_id = db.Column(db.Integer)
    state_other = db.Column(db.String(30))
    city_india_id = db.Column(db.Integer)
    city_other = db.Column(db.String(30))
    phone_primary = db.Column(db.String(20), nullable=False)
    phone_alternate = db.Column(db.String(20))
    agree_tc = db.Column(db.Boolean, default=False, nullable=False)
    marital_status = db.relationship('MaritalStatus', secondary=user_marital, lazy='dynamic', \
        backref=db.backref('user_details', lazy='joined'))
    height = db.Column(db.String(10), nullable=False)
    gotra = db.Column(db.String(20), nullable=False)
    original_surname = db.Column(db.String(20), nullable=False)
    father_fullname = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    about_yourself = db.Column(db.String(200))
    # upload photo
    # upload id
    where_know_id = db.Column(db.Integer, nullable=False)
    last_login = db.Column(db.DateTime)
    update_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    create_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


class MaritalStatus(db.Model):
    __tablename__ = 'marital_status'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    update_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


class Country(db.Model):
    __tablename__ = 'country'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    update_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


class StateIndia(db.Model):
    __tablename__ = 'state_india'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    update_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


class CityIndia(db.Model):
    __tablename__ = 'city_india'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    update_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)


class WhereKnow(db.Model):
    __tablename__ = 'where_know'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    update_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

