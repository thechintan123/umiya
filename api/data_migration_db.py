import pandas as pd
from pathlib import Path
import shutil
from app.models import User, UserDetails, MaritalStatus, UploadPhotos, db
from datetime import datetime

basedir = Path(__file__).parent

# Read in data
df = pd.read_csv(basedir / 'data' / 'out_new_a.txt', sep='\t')

for index, row in df.iterrows():
    # User object
    u = User(email=row['email'], role_id=row['role_id'])
    u.set_password(row['password'])
    db.session.add(u)

    # User Details object
    ud = UserDetails(about_yourself=row['about_yourself'], \
        agree_tc=True, \
        alternate_contact=row['alternate_contact'], \
        approval_date=datetime.utcnow(), \
        city=row['city'], \
        country_id=row['country_id'], \
        date_of_birth=datetime.strptime(row['date_of_birth'], '%d/%m/%Y'), \
        email_matched_notification=False, \
        father_name=row['father_name'], \
        first_name=row['first_name'], gender_id=row['gender_id'], \
        gotra_id=row['gotra_id'], \
        height_cms=row['height'], \
        last_name=row['last_name'], \
        marital_status_id=row['marital_status_id'], \
        original_surname=row['original_surname'], \
        partner_age_from=row['partner_age_from'], \
        partner_age_to=row['partner_age_to'], \
        partner_height_from_cms=row['partner_height_from'], \
        partner_height_to_cms=row['partner_height_to'], \
        primary_contact=row['primary_contact'], \
        residential_address=row['residential_address'], \
        state=row['state'], \
        status_id=row['status_id'], \
        where_know_id=row['where_know_id'], \
        upload_proof=row['upload_proof'], \
        migration_data=True)
    ud.user = u

    # Partner Marital Status many to many table
    pms = row['PartnerMaritalStatus']
    pms_id = []
    if "Never Married" in pms:
        pms_id.append(1)
    if "Divorced" in pms:
        pms_id.append(2)
    if "Widowed" in pms:
        pms_id.append(3)
    if "Awaiting Divorce" in pms:
        pms_id.append(4)
    
    for p in pms_id:
        m = MaritalStatus.query.filter_by(id=p).first()
        ud.partner_marital_status.append(m)
    
    db.session.add(ud)

    # Upload Photos object
    photos = row['upload_photos'].split(",")
    for p in photos:
        if p != 'nil':
            up = UploadPhotos(filename=p)
            up.user_details = ud
            db.session.add(up)

    db.session.commit()

    # Create photo folder and copy to destination
    photodir = basedir / 'app' / 'static' / 'uploads'
    new_folder = photodir / str(ud.id)
    new_folder.mkdir(exist_ok=True)

    if row['upload_proof'] != 'nil':
        from_file = basedir / 'data' / 'image' / str(row['upload_proof'])
        to_file = new_folder / str(row['upload_proof'])
        #to_file = basedir / 'data' / 'image_pa' / str(row['upload_proof'])
        shutil.copy(from_file, to_file)

    if row['upload_photos'] != 'nil':
        photos = row['upload_photos'].split(",")
        for p in photos:
            from_file = basedir / 'data' / 'image' / str(p)
            to_file = new_folder / str(p)
            #to_file = basedir / 'data' / 'image_pa' / str(p)
            shutil.copy(from_file, to_file)
    