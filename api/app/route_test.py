from flask import request, jsonify
from PIL import Image
from strgen import StringGenerator
from pathlib import Path
from . import app


def bad_request(message):
    payload = {'error': '400', 'message': message}
    response = jsonify(payload)
    response.status_code = 400
    return response


# handle photo uploads
@app.route('/api/upload', methods=['POST'])
def upload():
    file_dict = request.files.to_dict()
    if len(file_dict) < 1:
        return bad_request('No file found')
    key = list(file_dict.keys())[0]
    file = file_dict[key]

    # folder location to save image
    basedir = Path(__file__).parent
    folder = basedir / 'static/uploads'
    if not folder.is_dir():
        folder.mkdir()
    # get a random file name 10 characters long
    filename = StringGenerator("[\d\w]{10}").render() + '.jpg'

    try:
        # use PIL to reduce image to max size 1800 x 1800 pixels
        size = (1800, 1800)
        img = Image.open(file.stream)
        # for png images need to convert to RGB format
        img = img.convert('RGB')
        img.thumbnail(size)
        img.save(folder / filename)
    except IOError as e:
        return bad_request('Unable to convert and save file')

    # if you like you can write to database here

    # return 204 - successful and no body
    return '', 204
