import pandas as pd

# columns
# address has commas save as tab?

# partnerAge split it from and to
# partnerMaritalStatus split it
# map marital_status_id

# DONE
# partnerHeightFrom, partnerHeightTo, height change db to float


def map_gender(row):
    if row['isMale'] == '0':
        return 2
    if row['isMale'] == '1':
        return 1
    return 99


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


df = pd.read_csv('data/umiya_data.txt', sep='\t', encoding='cp1252')

df['gender_id'] = df.apply(lambda row: map_gender(row), axis=1)
df['marital_status_id'] = df.apply(lambda row: map_marital_status(row), axis=1)
df[['partner_age_from', 'partner_age_to']] = df.PartnerAge.str.split('-', expand=True)

df.to_csv('data/test.txt', sep='\t', index=False)
# print(df.head)
