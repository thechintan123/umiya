import pandas as pd
import math
from pathlib import Path


basedir = Path(__file__).parent

# Read in data
df = pd.read_csv(basedir / 'data' / 'phone.txt', sep='\t', encoding='cp1252')

for index, row in df.iterrows():
    print (f'update user_details set primary_contact = "{ row["xmobile4"] }", alternate_contact = "{ row["xalternate4"] }" where id = { row["id"] };')