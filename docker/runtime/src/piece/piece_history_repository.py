#!/usr/bin/env python
# -*- coding: utf-8 -*-
from os import path
from json import load, dump
from .piece_history_model import PieceHistoryModel

class PieceHistoryRepository:
    _HISTORIES_FILE_PATH = '/var/ankenSugoroku/histories.json'

    def __init__(this):
        this._histories = {}

    
    def load(this):
        if path.exists(this._HISTORIES_FILE_PATH):
            with open(this._HISTORIES_FILE_PATH, 'r') as f:
                this._histories = json.load(f)


    def _save(this):
        with open(this._HISTORIES_FILE_PATH, 'w') as f:
            json.dump(this._histories, f)


    def commit(this, piece_id, history_id, date, move_from, move_to, comment):
        if piece_id in this._histories.keys:
            for h in this._histories[piece_id]:
                pass

