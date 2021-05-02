#!/usr/bin/env python
# -*- coding: utf-8 -*-
from .image_repository import ImageRepository
from os import path

class ImageService():
    def __init__(self):
        self._image_rep = ImageRepository()

    
    def allowed_ext(self, filename):
        return path.splitext(filename)[1] in ['.jpg', '.jpeg', '.png', '.gif']


    def save_project_img(self, img_stream, filename):
        return self._image_rep.save_project_img(img_stream, filename)


    def save_skill_img(self, img_stream, filename):
        return self._image_rep.save_skill_img(img_stream, filename)        


    def project_img_exist(self, filepath):
        return filepath in self._image_rep.get_project_images_path()


    def skill_img_exist(self, filepath):
        return filepath in self._image_rep.get_skill_images_path()

    
    def get_project_images_path(self):
        return self._image_rep.get_project_images_path()


    def get_skill_images_path(self):
        return self._image_rep.get_skill_images_path()