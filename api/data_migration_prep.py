import pandas as pd
import math
from pathlib import Path


basedir = Path(__file__).parent

def clean_orig_surname(row):
    surname = row['OriginalSurname']
    if type(surname) == str:
        s = surname.replace('<b>', '').replace('</b>', '').replace('&nbsp;', ' ')
        return s
    else:
        return row['LastName']


def map_country(country):
    if country == 1:
        return 81
    if country == 2:
        return 193
    if country == 16:
        return 9 
    if country == 38:
        return 34 
    if country == 211:
        return 55
    if country == 212:
        return 190


def map_gender(gender):
    if gender == 0:
        return 2
    if gender == 1:
        return 1


def map_marital_status(marital_status):
    if marital_status == 'Divorced':
        return 2
    if marital_status == 'Widowed':
        return 3
    if marital_status == 'Never Married':
        return 1
    if marital_status == 'Awaiting Divorce':
        return 4
    return 1


def convert_height(height):
    if not math.isnan(height):
        return math.floor(height * 30.48)
    else:
        return 170.6
                

def convert_partner_height_from(height):
    if not math.isnan(height):
        return math.floor(height * 30.48)
    else:
        return 121


def convert_partner_height_to(height):
    if not math.isnan(height):
        return math.ceil(height * 30.48)
    else:
        return 217


def clean_proof(row):
    proof = row['upload_proof']
    if isinstance(proof, str):
        return proof.replace('image/','')
    else:
        second_proof = row['UploadedAddressProof']
        if isinstance(second_proof, str):
            return second_proof.replace('image/','')
    return 'nil'


def clean_photo(photo):
    if isinstance(photo, str):
        return photo.replace('image/','')
    else:
        return 'nil'


# Read in data
df = pd.read_csv(basedir / 'data' / 'DB_RegistrationDetails_WORK3.txt', sep='\t', encoding='cp1252')

# Add columns
df['gender_id'] = df['isMale'].apply(map_gender)
df['marital_status_id'] = df['MaritalStatus'].apply(map_marital_status)
df[['partner_age_from', 'partner_age_to']] = df.PartnerAge.str.split('-', expand=True)
df['country_id'] = df['CountryId'].apply(map_country)
df['original_surname'] = df.apply(lambda row: clean_orig_surname(row), axis=1)
df['agree_tc'] = 1
df['email_matched_notification'] = 0
df['role_id'] = 2
df['where_know_id'] = 5
df['status_id'] = 2

# Remove columns
df = df.drop(columns=['isMale', 'CountryId', 'MaritalStatus', \
    'PartnerAge', 'FinalApprovalStatus', 'OriginalSurname'], axis=1)

# Rename columns
df = df.rename(columns={'Email': 'email', 'Password': 'password', \
    'FirstName': 'first_name', 'LastName': 'last_name', 'dob': 'date_of_birth', \
    'StateId': 'state', 'CityId': 'city', 'Mobile': 'primary_contact', \
    'alternateNo': 'alternate_contact', 'Height': 'height', 'Gotra': 'gotra_id', \
    'Description': 'about_yourself', 'FatherName': 'father_name', 'Address': 'residential_address', \
    'PartnerHeightFrom': 'partner_height_from', 'PartnerHeightTo': 'partner_height_to', \
    'LastLoginDateTime': 'last_login', 'UploadedID': 'upload_proof'})

# Clean columns
df['height'] = df['height'].apply(convert_height)
df['partner_height_from'] = df['partner_height_from'].apply(convert_partner_height_from)
df['partner_height_to'] = df['partner_height_to'].apply(convert_partner_height_to)
df['partner_age_from'].fillna(value=18, inplace=True)
df['partner_age_to'].fillna(value=60, inplace=True)
df['city'].fillna(value='nil', inplace=True)
df['state'].fillna(value='nil', inplace=True)
df['upload_proof'] = df.apply(lambda row: clean_proof(row), axis=1)
df['about_yourself'] = df['about_yourself'].str.slice(0, 500)
df['about_yourself'].fillna(value='nil', inplace=True)
df['father_name'].fillna(value='nil', inplace=True)
df['residential_address'].fillna(value='nil', inplace=True)
df['gotra_id'].fillna(value=1, inplace=True)
df['PartnerMaritalStatus'].fillna(value='Never Married,Divorced,Widowed,Awaiting Divorce', inplace=True)
df['alternate_contact'].fillna(value='nil', inplace=True)

# Read in photos data
df2 = pd.read_csv(basedir / 'data' / 'DB_MemberImages.txt', sep='\t', encoding='cp1252')
df2['ImageUrl'] = df2['ImageUrl'].apply(clean_photo)
df2.to_csv(basedir / 'data' / 'out_b.txt', sep='\t', index=False)

for index, row in df.iterrows():
    photo_rows = df2.loc[df2['MemberId'] == row['Pkid']]
    r = []
    for index2, row2 in photo_rows.iterrows():
        if isinstance(row2['ImageUrl'], str):
            r.append(row2['ImageUrl'])
    if len(r) > 0:
        df.at[index, 'upload_photos'] = ','.join(r)
    else:
        df.at[index, 'upload_photos'] = 'nil'

# Write to file
df.to_csv(basedir / 'data' / 'out_a.txt', sep='\t', index=False)

