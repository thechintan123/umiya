import requests
import json
import os
from app.models import UserDetails, db
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta


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

users_notif = db.session.query(UserDetails) \
    .filter(UserDetails.email_matched_notification == True).all()
users_new = db.session.query(UserDetails) \
    .filter(UserDetails.create_date >= one_day_ago).all()

for u in users_notif:
    match_users_id = []
    for n in users_new:
        if (u.gender.id == n.gender.id):
            continue
        dob = n.date_of_birth
        age = relativedelta(now, dob).years
        if (age < u.partner_age_from or age > u.partner_age_to):
            continue
        if (n.height < u.partner_height_from or n.height > u.partner_height_to):
            continue
        pms_match = False
        for pms in u.partner_marital_status:
            if pms.id == n.marital_status.id:
                pms_match = True
        if not pms_match:
            continue
        match_users_id.append(n.user.id)
        print('Attempt to send email to', u.user.email,
              ', matched with user', n.user.email)
    if match_users_id:
        url = os.environ['EMAIL_NOTIF_URL']
        payload = {'user_id': u.user.id, 'match_users_id': match_users_id}
        x = requests.post(url, json=payload, auth=(
            os.environ['EMAIL_NOTIF_USER'], os.environ['EMAIL_NOTIF_PASS']))
        if (x.status_code == 204):
            print('Email successfully sent to ', u.user.email)
        else:
            print(os.environ['EMAIL_NOTIF_USER'])
            print(os.environ['EMAIL_NOTIF_PASS'])
            print('Email error sending to', u.user.email,
                  ' with status code ', x.status_code)