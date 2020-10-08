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
        'role.id'), default=2, nullable=False)
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

    @ staticmethod
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
    name = db.Column(db.String(20), unique=True, nullable=False)
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
    date_of_birth = db.Column(db.DateTime, nullable=False)
    country_id = db.Column(db.Integer, db.ForeignKey(
        'country.id'), nullable=False)
    state = db.Column(db.String(30), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    primary_contact = db.Column(db.String(20), nullable=False)
    alternate_contact = db.Column(db.String(20))
    agree_tc = db.Column(db.Boolean, default=False, nullable=False)
    marital_status_id = db.Column(db.Integer, db.ForeignKey(
        'marital_status.id'), nullable=False)
    height = db.Column(db.String(20), nullable=False)
    gotra_id = db.Column(db.Integer, db.ForeignKey('gotra.id'), nullable=False)
    original_surname = db.Column(db.String(20), nullable=False)
    father_name = db.Column(db.String(50), nullable=False)
    residential_address = db.Column(db.String(100), nullable=False)
    about_yourself = db.Column(db.String(200))
    upload_photos = db.relationship(
        'UploadPhotos', backref='user_details', lazy='dynamic')
    upload_proof = db.Column(db.String(70))
    partner_age_from = db.Column(db.Integer, nullable=False)
    partner_age_to = db.Column(db.Integer, nullable=False)
    partner_height_from = db.Column(db.String(20), nullable=False)
    partner_height_to = db.Column(db.String(20), nullable=False)
    # many to many relationship can be defined on either table
    partner_marital_status = db.relationship('MaritalStatus', secondary=user_partner_marital, lazy='dynamic',
                                             backref=db.backref('pms_prefs', lazy='dynamic'))
    where_know_id = db.Column(db.Integer, db.ForeignKey(
        'where_know.id'), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey(
        'profile_status.id'), default=1, nullable=False)
    email_matched_notification = db.Column(db.Boolean, default=True, nullable=False)
    update_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    create_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    approval_date = db.Column(db.DateTime)
    correction_comments = db.Column(db.String(500))


    def to_dict(self):
        # many to many
        pms = []
        for p in self.partner_marital_status:
            pms.append(p.to_dict())

        upload_photos = []
        for u in self.upload_photos:
            upload_photos.append(u.to_dict())

        data = {
            'id': self.id,
            'email': self.user.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'gender': self.gender.to_dict(),
            'date_of_birth': self.date_of_birth,
            'country': self.country.to_dict(),
            'state': self.state,
            'city': self.city,
            'primary_contact': self.primary_contact,
            'alternate_contact': self.alternate_contact,
            'agree_tc': self.agree_tc,
            'marital_status': self.marital_status.to_dict(),
            'height': self.height,
            'gotra': self.gotra.to_dict(),
            'original_surname': self.original_surname,
            'father_name': self.father_name,
            'residential_address': self.residential_address,
            'about_yourself': self.about_yourself,
            'partner_age_from': self.partner_age_from,
            'partner_age_to': self.partner_age_to,
            'partner_height_from': self.partner_height_from,
            'partner_height_to': self.partner_height_to,
            'partner_marital_status': pms,
            'where_know': self.where_know.to_dict(),
            'status': self.status.to_dict(),
            'email_matched_notification': self.email_matched_notification,
            'last_login': self.user.last_login.isoformat() + 'Z' if self.user.last_login else None,
            'upload_proof': self.upload_proof,
            'upload_photos': upload_photos,
            'approval_date' : self.approval_date,
            'correction_comments': self.correction_comments
        }
        return data

    def from_dict(self, data, new_user=False):
        if new_user:
            user = User(email=data['email'])
            user.set_password(data['password'])
            self.user = user
        else:
            if 'password' in data and data['password'] is not None:
                self.user.set_password(data['password'])
                self.user.update_date = datetime.utcnow()

        for key in data:
            if data[key] is not None and key not in \
                    ['password', 'country', 'other_country',
                     'gotra', 'where_know', 'marital_status', 'gender',
                     'date_of_birth', 'partner_marital_status',
                     'status', 'id', 'email', 'upload_photos', 'upload_proof','correction_comments']:
                setattr(self, key, data[key])

        # had to separate queries and assign to self otherwise SQLachemy seems to commit too early???
        country = gotra = where_know = marital_status = gender = status = None
        partner_marital_status = []
        if 'country' in data and data['country'] is not None:
            country = Country.query.filter_by(
                id=int(data['country']['id'])).first()
        if 'gotra' in data and data['gotra'] is not None:
            gotra = Gotra.query.filter_by(id=int(data['gotra']['id'])).first()
        if 'where_know' in data and data['where_know'] is not None:
            where_know = WhereKnow.query.filter_by(
                id=int(data['where_know']['id'])).first()
        if 'marital_status' in data and data['marital_status'] is not None:
            marital_status = MaritalStatus.query.filter_by(
                id=int(data['marital_status']['id'])).first()
        if 'gender' in data and data['gender'] is not None:
            gender = Gender.query.filter_by(
                id=int(data['gender']['id'])).first()
        if 'status' in data and data['status'] is not None:
            status = ProfileStatus.query.filter_by(id=int(data['status']['id'])).first()                
        if 'partner_marital_status' in data and data['partner_marital_status'] is not None:
            for pms in data['partner_marital_status']:
                partner_marital_status.append(
                    MaritalStatus.query.filter_by(id=int(pms['id'])).first())
        if country is not None:
            self.country = country
        if gotra is not None:
            self.gotra = gotra
        if where_know is not None:
            self.where_know = where_know
        if marital_status is not None:
            self.marital_status = marital_status
        if gender is not None:
            self.gender = gender
        if status is not None:
            self.status = status
            if status.name == 'Approved':
                self.approval_date = datetime.utcnow()
            if status.name == 'Correction' and 'correction_comments' in data:
                if data['correction_comments'] is not None:
                    setattr(self, 'correction_comments', data['correction_comments'])
        if 'date_of_birth' in data and data['date_of_birth'] != '':
            self.date_of_birth = datetime.strptime(
                data['date_of_birth'], '%Y-%m-%d')
        if len(partner_marital_status) > 0:
            self.partner_marital_status = []
            for pms in partner_marital_status:
                self.partner_marital_status.append(pms)

        self.update_date = datetime.utcnow()

    def __repr__(self):
        return '<UserDetails {}>'.format(self.first_name)


class ProfileStatus(db.Model):
    __tablename__ = 'profile_status'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    user_details = db.relationship(
        'UserDetails', backref='status', lazy='dynamic')

    def to_dict(self):
        return {'id': self.id, 'name': self.name}

    def __repr__(self):
        return '<ProfileStatus {}>'.format(self.name)


class UploadPhotos(db.Model):
    __tablename__ = 'upload_photos'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(70), nullable=False)
    user_details_id = db.Column(db.Integer, db.ForeignKey(
        'user_details.id'), nullable=False)
    update_date = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)

    def to_dict(self):
        return {'id': self.id, 'user_details_id': self.user_details_id, 'filename': self.filename}

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

    def to_dict(self):
        return {'id': self.id, 'name': self.name}

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

    def to_dict(self):
        return {'id': self.id, 'name': self.name}

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

    def to_dict(self):
        return {'id': self.id, 'name': self.name}

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

    def to_dict(self):
        return {'id': self.id, 'name': self.name}

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

    def to_dict(self):
        return {'id': self.id, 'name': self.name}

    def __repr__(self):
        return '<Gender {}>'.format(self.name)
