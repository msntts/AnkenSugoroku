#!/usr/bin/env python
# -*- coding: utf-8 -*-
from os import path
from json import load, dump
from .piece_history_model import PieceHistoryModel
from const import VARIABLE_STORE_DIR

class PieceHistoryRepository:
    def __init__(self):
        self._HISTORIES_FILE_PATH = path.join(VARIABLE_STORE_DIR, 'histories.json')
        self._histories = {}

    
    def load(self):
        if path.exists(self._HISTORIES_FILE_PATH):
            with open(self._HISTORIES_FILE_PATH, 'r') as f:
                this._histories = json.load(f)


    def _save(self):
        with open(self._HISTORIES_FILE_PATH, 'w') as f:
            json.dump(self._histories, f)


    def commit(self, piece_id, history_id, date, move_from, move_to, comment):
        if piece_id in self._histories.keys:
            for h in self._histories[piece_id]:
                pass

