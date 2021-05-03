#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, Markup, abort, jsonify
from os import path, makedirs, chmod
from piece.piece_service import PieceService
from piece.piece_model import PieceModel
from piece.piece_command import PieceCommand
from image.image_service import ImageService
import traceback

app = Flask(__name__,  static_url_path='/')

is_debug = True

piece_service = PieceService()
image_service = ImageService()

@app.route('/pieces/', methods=['GET'])
def get_all_pieces_id():
    pieces = []
    for piece in piece_service.get_all_pieces():
        pieces.append(piece.to_dict())

    return jsonify(pieces), 200


@app.route('/pieces/', methods=['POST'])
def create_piece():
    payload = request.get_json(force=True)

    try:
        new_piece = piece_service.create_piece(PieceCommand(payload))

        return jsonify(new_piece.to_dict()), 201
    except ValueError as ve:
        return jsonify({
            'message': f'{ve.args[0]}',
            'payload': payload}), 400


@app.route('/pieces/<string:piece_id>', methods=['PUT'])
def update_piece(piece_id):
    if piece_service.is_piece_exist(piece_id):
        payload = request.get_json(force=True)
        try:
            updated_piece = piece_service.update_piece(
                piece_id, PieceCommand(payload))

            return jsonify(updated_piece.to_dict()), 200 
        except ValueError as ve:
            return jsonify({
            'message': f'{ve.args[0]}',
            'payload': payload}), 400
    else:
        return jsonify({
            'message': '存在しないpiece_idです。',
            'piece_id': piece_id}), 400
    
    return 200


@app.route('/pieces/<string:piece_id>', methods=['GET'])
def get_piece(piece_id):
    if piece_service.is_piece_exist(piece_id):
        piece = piece_service.get_piece(piece_id)
        return jsonify(piece.to_dict()), 200
    else:
        return jsonify({
            'message': f'存在しないpiece_idです',
            'requested': piece_id}), 400


@app.route('/pieces/<string:piece_id>', methods=['DELETE'])
def remove_piece(piece_id):
    if piece_service.is_piece_exist(piece_id):
        piece_service.remove_piece(piece_id)
        return jsonify({'message': f'piece_id {piece_id} is deleted.'}), 200
    else:
        return jsonify({
            'message': f'存在しないpiece_idです',
            'requested': piece_id}), 400


@app.route('/project-image', methods=['POST'])
def upload_project_image():
    # 本家サンプル参照 https://flask.palletsprojects.com/en/1.1.x/patterns/fileuploads/
    if 'project' in request.files:
        img_file = request.files['project']
        # 拡張子チェック
        if image_service.allowed_ext(img_file.filename):
            file_path = image_service.save_project_img(img_file.stream, img_file.filename)
            return jsonify({'message': f'{img_file.filename} is uploaded.'}), 200
        else:
            return jsonify({'message': f'{path.splitext(img_file.filename)}は許可しない拡張子です'}), 415
    else:
        return jsonify({'message': '不正なリクエストです'}), 400


@app.route('/project-images/', methods=['GET'])
def get_project_images_path():
    return jsonify({'images': image_service.get_project_images_path()}), 200


@app.route('/skill-image', methods=['POST'])
def upload_skill_image():
    # 本家サンプル参照 https://flask.palletsprojects.com/en/1.1.x/patterns/fileuploads/
    if 'skill' in request.files:
        img_file = request.files['skill']
        # 拡張子チェック
        if image_service.allowed_ext(img_file.filename):
            file_path = image_service.save_skill_img(img_file.stream, img_file.filename)
            return jsonify({'message': f'{img_file.filename} is uploaded.'}), 200
        else:
            return jsonify({'message': f'{path.splitext(img_file.filename)}は許可しない拡張子です'}), 415
    else:
        return jsonify({'message': '不正なリクエストです'}), 400


@app.route('/skill-images', methods=['GET'])
def get_skill_images_path():
    return jsonify({'images': image_service.get_skill_images_path()}), 200


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
    return jsonify({'exception_message': traceback.format_exception(type(e), e, e.__traceback__)}), 500


if __name__ == "__main__":
    app.run(host = '0.0.0.0', port = 5000, debug = is_debug)