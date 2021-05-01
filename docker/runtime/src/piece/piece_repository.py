#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import os
import pathlib
from .piece_model import PieceModel

class PieceRepository(object):
    _PIECE_DATA_PATH = '/assets/PieceData.json'
    _PIECE_TMP_DATA_EXT = '.tmp'

    def __new__(cls, *args, **kargs):
        if not hasattr(cls, "_INSTANCE"):
            cls._INSTANCE = super(PieceRepository, cls).__new__(cls)
        return cls._INSTANCE


    def __init__(self):
        try:
            # テンプファイルがあったらそっちを正とする
            filename = PieceRepository._PIECE_DATA_PATH
            tmp_ext = PieceRepository._PIECE_TMP_DATA_EXT
            if os.path.exists(f'{filename}{tmp_ext}'):
                # 今あるjsonを消して.tmpで上書き
                if os.path.exists(filename):
                    os.remove(filename)
                os.rename(f'{filename}{tmp_ext}', filename)
            with open(filename, 'r') as f:
                self._pieces = json.load(f)
        except:
            self._pieces = {}


    def get_all_pieces(self):
        pieces = []

        for id in self._pieces:
            pieces.append(self._to_piece_model(id))

        return pieces


    def find_piece_by_id(self, id):
        if id in self._pieces:
            return self._to_piece_model(id)
        else:
            return None


    def _to_piece_model(self, id):
        return PieceModel(
                    int(id),
                    self._pieces[id]['name'],
                    self._pieces[id]['url_img_project'],
                    self._pieces[id]['url_img_skill']
                )


    def set_piece(self, id, name, url_img_project, url_img_skill):
        self._pieces[id] = {
            'name': name,
            'url_img_project': url_img_project,
            'url_img_skill': url_img_skill
        }

        self._commit()


    def remove_piece(self, id):
        del self._pieces[id]

        self._commit()


    def _commit(self):
        # 保存中に何かあってもロールバックするように
        filename = PieceRepository._PIECE_DATA_PATH
        tmp_ext = PieceRepository._PIECE_TMP_DATA_EXT
        if os.path.exists(filename):
            os.rename(filename, f'{filename}{tmp_ext}')

        with open(filename, 'w') as f:
            json.dump(self._pieces, f)
        
        # 保存成功したようなので.tmpを消す
        os.remove(f'{filename}{tmp_ext}')