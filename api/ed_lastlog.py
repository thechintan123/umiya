import pandas as pd
import math
from pathlib import Path


basedir = Path(__file__).parent

# Read in data
df = pd.read_csv(basedir / 'data' / 'lastlogin_ed2.txt', sep='\t', encoding='cp1252')

f = open(basedir / 'data' / 'edLlastlog.txt', 'w')
for index, row in df.iterrows():
    f.write (f'update user_details set education = "{ row["Education"] }" where id = { row["udid"] };\n')
    f.write (f'update user set last_login = "{ row["LastLogin"] }" where id = { row["uid"] };\n')
f.close()