import pandas as pd
from pathlib import Path
from app.models import User, UserDetails, db

basedir = Path(__file__).parent

# Read in data
df = pd.read_csv(basedir / 'data' / 'out.txt', sep='\t')

for index, row in df.iterrows():
    u = User(email=row['email'], role_id=row['role_id'])
    u.set_password(row['password'])
    print (u)