from flask import jsonify, request
from . import app
from datetime import datetime, timedelta
from sqlalchemy import and_, desc
from .models import UserDetails, Country, MaritalStatus, Gender, User, ProfileStatus, Role
from app import db


# helper function for search
def convert_to_cms(height_in_foot_inches):
    slice_object1 = slice(0, 1)
    height_ft = height_in_foot_inches[slice_object1]
    slice_object2 = slice(5, 7)
    height_inches = height_in_foot_inches[slice_object2]
    height_cms = float(height_ft) * 30.48 + float(height_inches) * 2.54
    return height_cms


# search Function
@app.route('/api/search', methods=['POST'])
def search():
    data = request.get_json() or {}

    country_id_local = []
    countries = data.get("country")
    if countries is not None:
        for country in countries:
            country_id_local.append(country['id'])
    else:
        ## otherwise default to India
        india = Country.query.filter_by(name='India').first()
        country_id_local.append(india.id)
    
    marital_status_id_local =[]
    marital_status_preferences = data.get('maritalStatusPreference')
    if len(marital_status_preferences) != 0:
        for marital_status in marital_status_preferences:
            marital_status_id_local.append(marital_status['id'])
    else:
        # otherwise default to all marital status
        ms = MaritalStatus.query.all()
        marital_status_id_local = [m.id for m in ms]

    #allowed Registration Type
    not_allowed_registration_type_id = 2 
    # 2 for Confidential/Private

    #allowed role
    allowed_role = 'User'


    curr_date = datetime.now()
    age_from_to = data["ageFromTo"]
    if age_from_to is not None:
        age_min = age_from_to.get("min")
        age_max = age_from_to.get("max")
    else:
        age_min = 18
        age_max = 50

    curr_date_plus_min = curr_date - timedelta(days=(age_min*365))
    curr_date_plus_max = curr_date - timedelta(days=(age_max*365))


    height_min_in_cms = data.get("heightFromCms")
    height_max_in_cms = data.get("heightToCms")


    looking_for = data.get("lookingFor")
    if looking_for is None or looking_for == '':
        # default to bride if empty
        female = Gender.query.filter_by(name="Female").first()
        looking_for = female.id
    else:
        looking_for = int(looking_for)

    allowed_status_id = '2' #2 is for Approved
    allowed_role_id = 2 #2 is for User
    test_user_id = 1 #0 - for non test users; 1 - for test users.
    
    user_details_id_from = None
    user_details_id_from = data.get("userDetailsIdFrom")

    user_details_id_to = None
    user_details_id_to = data.get("userDetailsIdTo")

    search_using_single_id = None
    search_using_id_range = False

    #To search using single id - The other Id should be valid.
    if ((user_details_id_from is not None and user_details_id_from != '') \
            and (user_details_id_to is None or user_details_id_to == '')):
        search_using_single_id = user_details_id_from
    elif (user_details_id_from is None or user_details_id_from == '') \
            and (user_details_id_to is not None and user_details_id_to != ''):
        search_using_single_id = user_details_id_to
    elif (user_details_id_from is not None and user_details_id_from != '') \
            and (user_details_id_to is not None and user_details_id_to != ''):
        search_using_id_range = True

    if search_using_single_id is not None:
        formatted_user_details_id = "%{}%".format(search_using_single_id)
        user_details = db.session.query(UserDetails).join(User).join(Role).filter(
                                            and_(UserDetails.status_id == allowed_status_id, \
                                            UserDetails.testing_user != test_user_id, \
                                            UserDetails.registration_type_id != not_allowed_registration_type_id, \
                                            Role.name == allowed_role, \
                                            UserDetails.id.like(formatted_user_details_id))) \
                                          .order_by(desc(User.last_login)).all()
    elif search_using_id_range is True:
        user_details = db.session.query(UserDetails).join(User).join(Role).filter(and_(UserDetails.status_id == allowed_status_id, \
                                          UserDetails.testing_user != test_user_id, \
                                          UserDetails.registration_type_id != not_allowed_registration_type_id, \
                                          Role.name == allowed_role, \
                                          UserDetails.id.between(user_details_id_from, user_details_id_to))) \
                                          .order_by(desc(User.last_login)).all()
    else:    
        user_details = db.session.query(UserDetails).join(User).join(Role).filter(and_(UserDetails.status_id == allowed_status_id,\
                                          UserDetails.testing_user != test_user_id, \
                                          Role.name == allowed_role, \
                                          UserDetails.registration_type_id != not_allowed_registration_type_id, \
                                          UserDetails.country_id.in_(country_id_local),\
                                          UserDetails.gender_id == looking_for, \
                                          UserDetails.date_of_birth <= curr_date_plus_min, UserDetails.date_of_birth >= curr_date_plus_max, \
                                          UserDetails.height_cms.between(height_min_in_cms, height_max_in_cms), \
                                          UserDetails.marital_status_id.in_(marital_status_id_local))) \
                                          .order_by(desc(User.last_login)).all()
    user_list = []
    for user_d in user_details:
        upload_photos = user_d.upload_photos.all()
        filenames = [u.filename for u in upload_photos]
        new_user = user_d.to_dict()
        new_user['upload_photos'] = filenames 
        new_user['last_login'] = user_d.user.last_login
        new_user['user_details_id'] = user_d.id
        user_list.append(new_user)
    return jsonify(user_list)


    # search Function
@app.route('/api/search-by-admin', methods=['POST'])
def search_by_admin():
    data = request.get_json() or {}

    allowed_status_id = '2' #1 is for Registered
    allowed_role_id = 2 #2 is for User

    first_name = ""
    first_name = data.get("first_name")
    if first_name is None:
        first_name = ""

    formatted_first_name = "%{}%".format(first_name)

    last_name = ""
    last_name = data.get("last_name")
    if last_name is None:
        last_name = ""
        
    formatted_last_name = "%{}%".format(last_name)

    email = ""
    email = data.get("email")
    if email is None:
        email = ""    
    formatted_email = "%{}%".format(email)

    user_details_id = ""
    user_details_id = data.get("user_details_id")
    if user_details_id is None:
        user_details_id = ""        
    formatted_user_details_id = "%{}%".format(user_details_id)

    all_genders =[]
    gender_id_local = []
    gender = data.get("gender")

    if gender != "" and gender is not None:
        gender_id_local.append(gender.get("id"))
    else:
        all_genders = Gender.query.all()
        for gen in all_genders:
            gender_id_local.append(gen.id)
    
    profile_status_id_local = []
    all_profile_statuses = {}
    profile_status_list = data.get("profile_status")
    if profile_status_list!= ""  and profile_status_list is not None and profile_status_list != []:
        profile_status_id_local = profile_status_list
    else:
        all_profile_statuses = ProfileStatus.query.all()
        for p_s in all_profile_statuses:
            profile_status_id_local.append(p_s.id)

    user_details = db.session.query(UserDetails).join(User).join(Role).filter(and_(User.email.like(formatted_email),
                                        UserDetails.first_name.like(formatted_first_name), \
                                        UserDetails.last_name.like(formatted_last_name) , \
                                        UserDetails.id.like(formatted_user_details_id), \
                                        UserDetails.gender_id.in_(gender_id_local), \
                                        UserDetails.status_id.in_(profile_status_id_local), \
                                        Role.name == 'User' \
                                        )).order_by(desc(User.last_login)).all()       
                                             
    user_list = []
    for user_d in user_details:
        upload_photos = user_d.upload_photos.all()
        filenames = [u.filename for u in upload_photos]
        new_user = user_d.to_dict()
        new_user['upload_photos'] = filenames 
        new_user['last_login'] = user_d.user.last_login
        new_user['user_details_id'] = user_d.id
        user_list.append(new_user)
    return jsonify(user_list)
