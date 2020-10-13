import pandas as pd
import math
from pathlib import Path


basedir = Path(__file__).absolute().parents[1]

# Todo - partner marital status
def clean_orig_surname(row):
    s = row['OriginalSurname']
    if type(s) == str:
        surname = s.replace('<b>', '').replace('</b>', '').replace('&nbsp;', ' ')
        return surname
    else:
        return 'nil'


def map_country(row):
    if row['CountryId'] == 1:
        return 81
    if row['CountryId'] == 2:
        return 193
    if row['CountryId'] == 16:
        return 9 
    if row['CountryId'] == 38:
        return 34 
    if row['CountryId'] == 211:
        return 55
    if row['CountryId'] == 212:
        return 190


def map_gender(row):
    if row['isMale'] == 0:
        return 2
    if row['isMale'] == 1:
        return 1


def map_marital_status(row):
    if row['MaritalStatus'] == 'Divorced':
        return 2
    if row['MaritalStatus'] == 'Widowed':
        return 3
    if row['MaritalStatus'] == 'Never Married':
        return 1
    if row['MaritalStatus'] == 'Awaiting Divorce':
        return 4
    return 1

                
def convert_partner_height_from(row):
    feet = row['partner_height_from']
    if not math.isnan(feet):
        return math.floor(feet * 30.48)
    else:
        return 121


def convert_partner_height_to(row):
    feet = row['partner_height_to']
    if not math.isnan(feet):
        return math.ceil(feet * 30.48)
    else:
        return 217


# Read in data
df = pd.read_csv(basedir / 'data' / 'umiya_data.txt', sep='\t', encoding='cp1252')

# Add columns
df['gender_id'] = df.apply(lambda row: map_gender(row), axis=1)
df['marital_status_id'] = df.apply(lambda row: map_marital_status(row), axis=1)
df[['partner_age_from', 'partner_age_to']] = df.PartnerAge.str.split('-', expand=True)
df['country_id'] = df.apply(lambda row: map_country(row), axis=1)
df['original_surname'] = df.apply(lambda row: clean_orig_surname(row), axis=1)
df['agree_tc'] = 1
df['email_matched_notification'] = 0
df['role_id'] = 2

# Remove columns
df = df.drop(columns=['isMale', 'CountryId', 'MaritalStatus', \
    'PartnerAge', 'FinalApprovalStatus', 'OriginalSurname'], axis=1)

# Rename columns
df = df.rename(columns={'Email': 'email', 'Password': 'password', \
    'FirstName': 'first_name', 'LastName': 'last_name', 'dob': 'date_of_birth', \
    'StateId': 'state', 'CityId': 'city', 'Mobile': 'primary_contact', \
    'alternateNo': 'alternate_contact', 'Height': 'height', 'Gotra': 'gotra_id', \
    'Description': 'about_yourself', 'FatherName': 'father_name', 'Address': 'residental_address', \
    'PartnerHeightFrom': 'partner_height_from', 'PartnerHeightTo': 'partner_height_to', \
    'LastLoginDateTime': 'last_login'})

# Clean columns
df['partner_height_from'] = df.apply(lambda row: convert_partner_height_from(row), axis=1)
df['partner_height_to'] = df.apply(lambda row: convert_partner_height_to(row), axis=1)
df['partner_age_from'].fillna(value=18, inplace=True)
df['partner_age_to'].fillna(value=60, inplace=True)
df['city'].fillna(value='nil', inplace=True)
df['state'].fillna(value='nil', inplace=True)

# Write to file
df.to_csv(basedir / 'data' / 'out.txt', sep='\t', index=False)

