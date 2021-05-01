#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
sys.path.append('../')

from .piece_repository import PieceRepository
from .piece_model import PieceModel
from .piece_command import PieceCommand
from image.image_service import ImageService

class PieceService():
    def __init__(self):
        self._piece_rep = PieceRepository()
        self._image_serv = ImageService()

    def is_piece_exist(self, id):
        return self.get_piece(id) is not None


    def get_all_pieces(self):
        return self._piece_rep.get_all_pieces()


    def get_piece(self, id):
        return self._piece_rep.find_piece_by_id(id)


    def create_piece(self, command):
        new_id =  self._number_new_piece_id()
        
        self._validate(new_id, command)

        self._piece_rep.set_piece(
            new_id,
            command.get_name(),
            command.get_url_img_project(),
            command.get_url_img_skill())

        return self._piece_rep.find_piece_by_id(new_id)


    def update_piece(self, id, command):
        self._validate(id, command)

        if self.is_piece_exist(id):
            self._piece_rep.set_piece(
                id,
                command.get_name(),
                command.get_url_img_project(),
                command.get_url_img_skill())
        else:
            return None

        return self._piece_rep.find_piece_by_id(id)


    def remove_piece(self, id):
        if self.is_piece_exist(id):
            self._piece_rep.remove_piece(id)
        else:
            raise ValueError('存在しないpiece_idです。')


    def _validate(self, id, command):
        if not command.get_url_img_skill() or not command.get_url_img_project():
            raise ValueError('引数url_img_projectとurl_img_skillは必須です。')

        err_msg = ''
        if not self._image_serv.project_img_exist(command.get_url_img_project()):
            err_msg += f'ファイルパス{command.get_url_img_project()}にデータが存在しません。'

        if self._image_serv.skill_img_exist(command.get_url_img_skill()):
            err_msg += f'ファイルパス{command.get_url_img_skill()}にデータが存在しません。'

        if err_msg:
            raise ValueError(err_msg)


    def _number_new_piece_id(self):
        new_id = 0
        for piece in self._piece_rep.get_all_pieces():
            new_id = max(new_id, piece.get_id())

        return new_id + 1

