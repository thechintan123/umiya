from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from . import db, app
import jwt


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(100))
    role_id = db.Column(db.Integer, db.ForeignKey(
        'role.id'), default=1, nullable=False)
    user_details = db.relationship(
        "UserDetails", uselist=False, backref="user", passive_deletes=True)
    last_login = db.Column(db.DateTime)
    update_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    create_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    token = db.Column(db.String(140), index=True, unique=True)
    token_expiration = db.Column(db.DateTime)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    # If token hasn't expired yet then return existing token
    # Otherwise create a new token with expiry date 1 hour from now
    # Update database with token info and return token
    def get_token(self, expires_in=3600):
        now = datetime.utcnow()
        if self.token and self.token_expiration > now + timedelta(seconds=60):
            return self.token
        payload = {'user': self.id, 'exp': now + timedelta(seconds=expires_in)}
        # decode('utf-8') converts token to string
        self.token = jwt.encode(
            payload, app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')
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
            id = jwt.decode(token, app.config['SECRET_KEY'], algorithms=[
                            'HS256'])['reset_password']
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


user_partner_marital = db.Table('user_partner_marital',
                                db.Column('user_details_id', db.Integer, db.ForeignKey(
                                    'user_details.id', ondelete='CASCADE'), primary_key=True),
                                db.Column('marital_status_id', db.Integer, db.ForeignKey(
                                    'marital_status.id'), primary_key=True)
                                )


class UserDetails(db.Model):
    __tablename__ = 'user_details'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user.id', ondelete='CASCADE'), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    gender_id = db.Column(db.Integer, db.ForeignKey(
        'gender.id'), nullable=False)
    dob = db.Column(db.DateTime, nullable=False)
    country_id = db.Column(db.Integer, db.ForeignKey(
        'country.id'), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    phone_primary = db.Column(db.String(20), nullable=False)
    phone_alternate = db.Column(db.String(20))
    agree_tc = db.Column(db.Boolean, default=False, nullable=False)
    marital_status_id = db.Column(db.Integer, db.ForeignKey(
        'marital_status.id'), nullable=False)
    height = db.Column(db.String(20), nullable=False)
    gotra_id = db.Column(db.Integer, db.ForeignKey('gotra.id'), nullable=False)
    original_surname = db.Column(db.String(20), nullable=False)
    father_fullname = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    about_yourself = db.Column(db.String(200))
    upload_photos = db.relationship(
        'UploadPhotos', backref='user_details', lazy='dynamic')
    upload_proof = db.Column(db.String(30))
    partner_age_from = db.Column(db.Integer, nullable=False)
    partner_age_to = db.Column(db.Integer, nullable=False)
    partner_height_from = db.Column(db.String(20), nullable=False)
    partner_height_to = db.Column(db.String(20), nullable=False)
    # many to many relationship can be defined on either table
    partner_marital_status = db.relationship('MaritalStatus', secondary=user_partner_marital, lazy='dynamic',
                                             backref=db.backref('pms_prefs', lazy='dynamic'))
    where_know_id = db.Column(db.Integer, db.ForeignKey(
        'where_know.id'), nullable=False)
    update_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    create_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return '<UserDetails {}>'.format(self.first_name)


class UploadPhotos(db.Model):
    __tablename__ = 'upload_photos'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(30), nullable=False)
    user_details_id = db.Column(db.Integer, db.ForeignKey(
        'user_details.id'), nullable=False)
    update_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return '<UploadPhotos {}>'.format(self.filename)


class MaritalStatus(db.Model):
    __tablename__ = 'marital_status'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    update_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    user_details = db.relationship(
        'UserDetails', backref='marital_status', lazy='dynamic')

    def __repr__(self):
        return '<MaritalStatus {}>'.format(self.name)


class Country(db.Model):
    __tablename__ = 'country'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    update_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    user_details = db.relationship(
        'UserDetails', backref='country', lazy='dynamic')

    def __repr__(self):
        return '<Country {}>'.format(self.name)


class WhereKnow(db.Model):
    __tablename__ = 'where_know'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    update_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    user_details = db.relationship(
        'UserDetails', backref='where_know', lazy='dynamic')

    def __repr__(self):
        return '<WhereKnow {}>'.format(self.name)


class Gotra(db.Model):
    __tablename__ = 'gotra'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    update_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    user_details = db.relationship(
        'UserDetails', backref='gotra', lazy='dynamic')

    def __repr__(self):
        return '<Gotra {}>'.format(self.name)


class Gender(db.Model):
    __tablename__ = 'gender'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10), nullable=False)
    update_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    user_details = db.relationship(
        'UserDetails', backref='gender', lazy='dynamic')

    def __repr__(self):
        return '<Gender {}>'.format(self.name)
