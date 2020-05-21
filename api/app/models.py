from flask import current_app
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from datetime import datetime, timedelta


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), index=True, unique=True, nullable=False)
    password_hash = db.Column(db.String(100))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), default=2, nullable=False)
    create_date = db.Column(db.DateTime,default=datetime.utcnow, nullable=False)
    token = db.Column(db.String(32), index=True, unique=True)
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
        self.token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')
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
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return None
        return User.query.get(data['id'])

    # creates token of user object
    # decode('utf-8') converts token to string
    def get_reset_password_token(self, expires_in=current_app.config['FORGOT_PASSWORD_TOKEN_EXPIRE']):
        return jwt.encode(
            {'reset_password': self.id, 'exp': datetime.utcnow() +
             timedelta(seconds=expires_in)},
            current_app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')

    # decodes token and returns user object
    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, current_app.config['SECRET_KEY'],
                            algorithms=['HS256'])['reset_password']
        except:
            return
        return User.query.get(id)

    def to_dict(self):
        data = {
            'email': self.email,
            'role': self.role.name
        }
        return data

    def __repr__(self):
        return '<User {}>'.format(self.email)


class Role(db.Model):
    __tablename__='role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    users = db.relationship('User',backref='role',lazy='dynamic')

    def __repr__(self):
        return '<Role {}>'.format(self.name)
