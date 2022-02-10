from . import app

# Serve the Quasar index file
# This should match all the routes you have in Quasar
@app.route('/')
@app.route('/register')
@app.route('/search')
@app.route('/login')
@app.route('/help')
@app.route('/logout')
@app.route('/update-profile')
@app.route('/profile')
@app.route('/forgot-password')
@app.route('/change-password')
@app.route('/admin-approval')
@app.route('/admin-update-profile')
@app.route('/contact-us')
def index():
    return app.send_static_file('index.html')




