
import firebase_admin
from firebase_admin import credentials, messaging
from dotenv import load_dotenv
from pathlib import Path
import datetime

basedir = Path(__file__).parent
load_dotenv(basedir / '.env')


registration_token = 'dg_rxGx8R12Jhwz-KEp9RA:APA91bGidb5DhNHMeWZL0Poke5J4nwnyUHthd82qOuvNzXdPmBQ1k-Tc4DoHNd7s3RULzRqqC5Hr5SJdvz3wqj3xOt3yrwuaADHElAOVd346Yu2S5zl4HP4Yx5wwaF0sjxAJqnumkG0m'
default_app = firebase_admin.initialize_app()

# See documentation on defining a message payload.
'''
message = messaging.Message(
    notification=messaging.Notification(
        title='Hi from Python 2',
        body='Test 123'
    ),
    topic=topic,
)
'''
message = messaging.Message(
    notification=messaging.Notification(
        title='Hello from Python 3',
        body='Test zzz',
    ),
    android=messaging.AndroidConfig(
        ttl=datetime.timedelta(seconds=3600),
        priority='normal'
    ),
    apns=messaging.APNSConfig(
        payload=messaging.APNSPayload(
            aps=messaging.Aps(badge=42),
        ),
    ),
    topic='/topics/all',
    #token=registration_token
)

# Send a message to the devices subscribed to the provided topic.
response = messaging.send(message)
# Response is a message ID string.
print('Successfully sent message:', response)



