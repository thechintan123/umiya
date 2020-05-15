from app import app
import datetime

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/time')
def get_current_date():
    now = datetime.datetime.now()
    return {'datetime': now}
