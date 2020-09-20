import requests
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
    .filter(UserDetails.email_matched_notification==True).all()
users_new = db.session.query(UserDetails) \
    .filter(UserDetails.create_date >= one_day_ago)

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
                pms_match=True
        if not pms_match:
            continue
        match_users_id.append(n.user.id)
    if match_users_id:
        url = 'https://thechintan123.pythonanywhere.com/api/batch-notification'
        #url = 'http://localhost:5000/api/batch-notification'
        payload = {'user_id': u.user.id, 'match_users_id': match_users_id}
        x = requests.post(url, data=payload)
        if (x.status_code == 204):
            print('Email successfully sent to ', u.user.email)
        else:
            print('Email sending error with status code ', x.status_code)

        

