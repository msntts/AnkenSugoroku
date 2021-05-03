#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .piece_model import PieceModel
from .repository_util import load_json, save_json

class PieceRepository(object):
    def __new__(cls, *args, **kargs):
        if not hasattr(cls, "_INSTANCE"):
            cls._INSTANCE = super(PieceRepository, cls).__new__(cls)
        return cls._INSTANCE


    def __init__(self):
        self._PIECE_DATA_FILE = 'PieceData.json'
        self._pieces = load_json(self._PIECE_DATA_FILE)


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
                    self._pieces[id]['url_img_skill'],
                    int(self._pieces[id]['position'])
                )


    def set_piece(self, id, name, url_img_project, url_img_skill, position):
        self._pieces[id] = {
            'name': name,
            'url_img_project': url_img_project,
            'url_img_skill': url_img_skill,
            'position': position
        }

        save_json(self._PIECE_DATA_FILE, self._pieces)


    def remove_piece(self, id):
        del self._pieces[id]

        save_json(self._PIECE_DATA_FILE, self._pieces)
