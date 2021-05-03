#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .piece_history_model import PieceHistoryModel
from .repository_util import load_json, save_json

class PieceHistoryRepository:
    def __new__(cls, *args, **kargs):
        if not hasattr(cls, "_INSTANCE"):
            cls._INSTANCE = super(PieceHistoryRepository, cls).__new__(cls)
        return cls._INSTANCE


    def __init__(self):
        self._HISTORIES_DATA_FILE = 'histories.json'
        self._histories = load_json(self._HISTORIES_DATA_FILE)


    def get_piece_histories(piece_id):
        try:
            histories = []
            for histories in self._histories[piece_id]:
                for history_id in histories:
                    histories.append(PieceHistoryModel(
                        int(history_id),
                        histories[history_id]['date'],
                        int(histories[history_id]['move_from']),
                        int(histories[history_id]['move_to']),
                        histories[history_id]['comment']
                ))

            return histories
        except:
            return []


    def set_piece_history(self, piece_id, history_id, date, move_from, move_to, comment):
        if not piece_id in self._histories:
            self._histories[piece_id] = {}

        if history_id in self._histories[piece_id]:
            self._histories[piece_id][history_id] = {}

        self._histories[piece_id][history_id] = {
            'date': date, 
            'move_from': move_from, 
            'move_to': move_to,
            'comment': comment
        }

        save_json(self._HISTORIES_DATA_FILE, self._histories)
