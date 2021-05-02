#!/usr/bin/env python
# -*- coding: utf-8 -*-

class PieceHistoryModel:
    def __init__(this, history_id, date, move_from, move_to, comment):
        this.history_id = history_id
        this.date = date
        this.move_from = move_from
        this.move_to = move_to
        this.comment = comment
