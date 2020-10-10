from flask import jsonify, request
from . import app
from datetime import datetime, timedelta
from sqlalchemy import and_, desc
from .models import UserDetails, Country, MaritalStatus, Gender, User, ProfileStatus
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
        for country in countries:
            country_id_local.append(country['id'])
    else:
        # otherwise default to India
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


    user_details = db.session.query(UserDetails).join(User).filter(and_(UserDetails.status_id == allowed_status_id,\
                                          UserDetails.country_id.in_(country_id_local),\
                                          UserDetails.gender_id == looking_for, \
                                          UserDetails.date_of_birth <= curr_date_plus_min, UserDetails.date_of_birth >= curr_date_plus_max, \
                                          UserDetails.height.between(height_min_in_cms, height_max_in_cms), \
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

    print("data", data)

    allowed_status_id = '2' #1 is for Registered

    first_name = ""
    first_name = data.get("first_name")
    if first_name is None:
        first_name = ""

    formatted_first_name = "%{}%".format(first_name)
    # print("formatted_first_name", formatted_first_name)


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
    # print("Gender 1", gender)

    if gender != "" and gender is not None:
        gender_id_local.append(gender.get("id"))
    else:
        all_genders = Gender.query.all()
        for gen in all_genders:
            gender_id_local.append(gen.id)
    
    # print("Gender 2", all_genders, gender_id_local)
    
    profile_status_id_local = []
    all_profile_statuses = {}
    profile_status_list = data.get("profile_status")
    if profile_status_list!= ""  and profile_status_list is not None and profile_status_list != []:
        profile_status_id_local = profile_status_list
    else:
        all_profile_statuses = ProfileStatus.query.all()
        for p_s in all_profile_statuses:
            profile_status_id_local.append(p_s.id)

    # print("Profile Statuses", all_profile_statuses, profile_status_id_local, profile_status_list)


    user_details = db.session.query(UserDetails).join(User).filter(and_(User.email.like(formatted_email),
                                        UserDetails.first_name.like(formatted_first_name), \
                                        UserDetails.last_name.like(formatted_last_name) , \
                                        UserDetails.id.like(formatted_user_details_id), \
                                        UserDetails.gender_id.in_(gender_id_local), \
                                        UserDetails.status_id.in_(profile_status_id_local))) \
                                        .order_by(desc(User.last_login)).all()       
    
    # print('User Details',user_details)                                          
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
