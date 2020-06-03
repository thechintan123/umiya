from flask import jsonify, request, url_for, g
from . import app, db
from .auth import basic_auth, token_auth
from .errors import error_response, bad_request
from .models import User, UserDetails, Role, Country, Gotra, WhereKnow, MaritalStatus, Gender


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/tokens', methods=['POST'])
@basic_auth.login_required
def get_token():
    token = basic_auth.current_user().get_token()
    payload = { \
        'email': basic_auth.current_user().email, \
        'token': token \
    }
    db.session.commit()
    return jsonify(payload)


@app.route('/api/tokens', methods=['DELETE'])
@token_auth.login_required
def revoke_token():
    token_auth.current_user().revoke_token()
    db.session.commit()
    # 204 - successful and no body
    return '', 204


@app.route('/api/users/<int:id>', methods=['GET'])
@token_auth.login_required
def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())


'''
@app.route('/api/users', methods=['POST'])
def register():
    data = request.get_json() or {}
    if 'email' not in data or 'password' not in data:
        return bad_request('must include email and password fields')
    if User.query.filter_by(email=data['email']).first():
        return bad_request('please use a different email address')
    user = User(email=data['email'])
    user.set_password(data['password'])
    # also adds token to user session
    user.get_token() 
    db.session.add(user)
    db.session.commit()
    
    payload = { \
        'email': user.email
    }
    response = jsonify(payload)
    response.status_code = 201
    # response.headers['Location'] = url_for('get_user', id=user.id)
    return response
'''

def get_row(table, id):
    return table.query.filter_by(id=id).first()
 

@app.route('/api/users', methods=['POST'])
def register():
    data = request.get_json() or {}
    print('data:', data)

    # Get objects from the dropdowns
    # country = get_row(Country, int(data['country']['id'])) # India
    gotra = get_row(Gotra, int(data['gotra']['id']))
    where_know = get_row(WhereKnow, int(data['sourceOfWebsite']['id']))
    marital_status = get_row(MaritalStatus, int(data['maritalStatus']['id']))
    gender = get_row(Gender, int(data['gender']['id']))

    # testing - http -v POST http://localhost:5000/api/users country:="{""id"": 1, ""name"": ""australia""}" gender:="{""id"": 1, ""name"": ""male""}"
    # map db model to form data
    user_detail = UserDetails(
        first_name=data['firstName'],
        last_name=data['lastName'],
        gender = gender, \
        dob=data['dateOfBirth'],
        country=data['country'],
        state=data['state'],
        city=data['city'],
        phone_primary=data['primaryContact'],
        phone_alternate=data['alternateContact'],
        agree_tc=data['agreeTnC'],
        marital_status=maritalStatus, \
        height=data['height'],
        gotra=gotra,
        original_surname=data['originalSurname'], \
        father_fullnane=data['fatherName'],
        address=data['residentialAddres'],
        about_yourself=data['aboutYourself'],
        partner_age_from=data['ageFrom'],
        partner_age_to=data['ageTo'], \
        partner_height_from=data['heightFrom'],
        partner_height_to=data['heightTo'], \
        #partner_marital_status = , # todo flask
        where_know=where_know
    )

    print('user_detail:', user_detail)
    return jsonify({ 'message': 'ok'})


def get_list(table):
    results = table.query.all()
    l = []
    for r in results:
        l.append({'id': r.id, 'name': r.name})
    return l


@app.route('/api/lists', methods=['GET'])
def lists():
    payload = {}
    country = get_list(Country)
    gotra = get_list(Gotra)
    where_know = get_list(WhereKnow)
    marital_status = get_list(MaritalStatus)
    gender = get_list(Gender)
    payload = {'country': country, 'gotra': gotra, 'where_know': where_know, \
         'marital_status': marital_status, 'gender': gender}
    return jsonify(payload)


@app.route('/api/hello', methods=['GET'])
@token_auth.login_required
def hello():
    return jsonify({'message': 'hello world!!!'})


