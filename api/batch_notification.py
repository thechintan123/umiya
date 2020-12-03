
import requests
import json
import os
from app.models import UserDetails, db
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from sqlalchemy.sql.expression import func
from sqlalchemy import and_, asc

'''
1. Loop through all users who want to be notified
2. For each user select new users (today) that match:
    -gender
    -age
    -height
    -marital status
3. If not empty list send email to user with list of match profile.
'''

now = datetime.now()
one_day_ago = now - timedelta(days=1)

now_weekday = now.weekday()
start_char = 'a'
end_char = 'z'
allowed_status_id = '2' #2 is for Approved

#Weekday function returns 0-Monday to 6-Sunday
if(now_weekday == 0):
    start_char = 'a'
    end_char = 'd'
elif(now_weekday == 1):
    start_char = 'd'
    end_char = 'h'
elif(now_weekday == 2):
    start_char = 'h'
    end_char = 'l'
elif(now_weekday == 3):
    start_char = 'l'
    end_char = 'p'
elif(now_weekday == 4):
    start_char = 'p'
    end_char = 's'
elif(now_weekday == 5):
    start_char = 's'
    end_char = 'v'
elif(now_weekday == 6):
    start_char = 'v'
    end_char = 'z'
else:
    start_char = 'v'
    end_char = 'z' 

print(f'First name starts with "{start_char}" and ends with "{end_char}"')

users_notif = db.session.query(UserDetails) \
    .filter(and_(UserDetails.email_matched_notification == True, \
        UserDetails.first_name.between(start_char + "%", end_char+"%"), \
        UserDetails.status_id == allowed_status_id)) \
        .order_by(asc(UserDetails.first_name)).all()

users_approved = db.session.query(UserDetails) \
    .filter(UserDetails.status_id == allowed_status_id).all()

if not users_notif:
    print('No users to notify')

for u in users_notif:
    match_users_id = []
    new_match_users_id = []

    for n in users_approved:
        if (u.gender.id == n.gender.id):
            continue
        dob = n.date_of_birth
        age = relativedelta(now, dob).years
        if (age < u.partner_age_from or age > u.partner_age_to):
            continue
        if (n.height_cms < u.partner_height_from_cms or n.height_cms > u.partner_height_to_cms):
            continue
        pms_match = False
        for pms in u.partner_marital_status:
            if pms.id == n.marital_status.id:
                pms_match = True
        if not pms_match:
            continue
        new_user_approval_days = relativedelta(now, n.approval_date).days

        if new_user_approval_days > 7:
            match_users_id.append(n.user.id)
        else:
            new_match_users_id.append(n.user.id)

        
    print (f'Checking user {u.first_name} {u.last_name} ({u.user.email})')
        
    if new_match_users_id:
        url = os.environ['EMAIL_NOTIF_URL']
        payload = {'user_id': u.user.id, 'match_users_id': match_users_id,
        'new_match_users_id' : new_match_users_id}
        x = requests.post(url, json=payload, auth=(
            os.environ['EMAIL_NOTIF_USER'], os.environ['EMAIL_NOTIF_PASS']))
        if (x.status_code == 204):
            print('Email successfully sent to:', u.user.email)
            print('New matched users:', new_match_users_id)
            print('Matched users:', match_users_id)
            print('==')
        else:
            print('Email error sending to', u.user.email,
                  ' with status code ', x.status_code)
    else:
        print('No new matched users found')
