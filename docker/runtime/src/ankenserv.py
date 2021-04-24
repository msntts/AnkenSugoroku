#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, Markup, abort, jsonify
from werkzeug.utils import secure_filename
from os import path, makedirs

app = Flask(__name__)

is_debug = True

@app.route('/')
def api_usage():
    return "API USAGE...under construct"


@app.route('/map')
def good():
    name = "Good"
    return name


@app.route('/anken-image', methods=['POST'])
def upload_anken_image():
    return _upload_image('anken')


@app.route('/anken-image', methods=['GET'])
def get_anken_post_disp():
    return _get_post_disp('anken')


@app.route('/skill-image', methods=['POST'])
def upload_skill_image():
    return _upload_image('skill')


@app.route('/skill-image', methods=['GET'])
def get_skill_post_disp():
    return _get_post_disp('skill')


def _upload_image(image_kind):
        # 本家サンプル参照 https://flask.palletsprojects.com/en/1.1.x/patterns/fileuploads/
    if image_kind in request.files:
        img_file = request.files[image_kind]
        # 拡張子チェック
        if path.splitext(img_file.filename)[1] in ['.jpg', '.jpeg', '.png', '.gif']:
            filename = secure_filename(img_file.filename)
            
            makedirs(f'/assets/{image_kind}', exist_ok=True)

            img_file.save(path.join(f'/assets/{image_kind}', filename))
            return jsonify({'message': f'{filename} is uploaded.'}), 200
        else:
            return jsonify({'message': f'{path.splitext(img_file.filename)}は許可しない拡張子です'}), 415
    else:
        return jsonify({'message': '不正なリクエストです'}), 400


def _get_post_disp(image_kind):
    if is_debug:
        return f'''
        <html>
            <body>
                <form method="post" enctype="multipart/form-data">
                    <input id="{image_kind}" type="file" name="{image_kind}" accept="image/jpeg, image/png, image/gif">
                    <button type="submit">送信する</button>
                </form>
            </body>
        </html>
        ''', 200
    else:
        return jsonify({'message': '不正なリクエストです'}), 400


@app.route('/history', methods=['GET'])
def get_history():
    id = request.args.get('id', '')
    if id == '':
        return "your request is all"
    else:
        return f"your request id is {id}"


@app.route('/history', methods=['POST'])
def post_history():
    id = request.args.get('id', '')
    if id == '':
        return "your request is all"
    else:
        return f"your request id is {id}"


@app.errorhandler(Exception)
def exception_handler(e):
    # すべての例外をハンドルする
    return jsonify({'exception_message': e.message}), 500


if __name__ == "__main__":
    app.run(host = '0.0.0.0', port = 5000, debug = is_debug)