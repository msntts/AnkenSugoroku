#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
import unittest
import json

class AnkenServerTest(unittest.TestCase):
    def test_post_project_image(self):
        file = {'project': open('resource/anken.png', 'rb')}
        response = requests.post('http://anken_server:5000/project-image', files = file)
        response.encoding = 'utf-8'
        self.assertEqual(response.status_code, 200, response.json())


    def test_post_unkown_image(self):
        file = {'hoge': open('resource/anken.png', 'rb')}
        response = requests.post('http://anken_server:5000/project-image', files = file)
        response.encoding = 'utf-8'
        self.assertEqual(response.status_code, 400, response.json())        


    def test_post_project_denied_image(self):
        file = {'project': open('resource/bad.txt', 'rb')}
        response = requests.post('http://anken_server:5000/project-image', files = file)
        response.encoding = 'utf-8'
        self.assertEqual(response.status_code, 415, response.json())


    def test_get_project_images(self):
        response = requests.get('http://anken_server:5000/project-images/')
        response.encoding = 'utf-8'
        images_path = response.json()
        self.assertTrue('anken.png' in images_path, response.json())

    def test_post_skill_image(self):
        file = {'skill': open('resource/skill.jpg', 'rb')}
        response = requests.post('http://anken_server:5000/skill-image', files = file)
        response.encoding = 'utf-8'
        self.assertEqual(response.status_code, 200, response.json())


    def test_post_unkown_image(self):
        file = {'hoge': open('resource/skill.jpg', 'rb')}
        response = requests.post('http://anken_server:5000/skill-image', files = file)
        response.encoding = 'utf-8'
        self.assertEqual(response.status_code, 400, response.json())


    def test_post_project_denied_image(self):
        file = {'skill': open('resource/bad.txt', 'rb')}
        response = requests.post('http://anken_server:5000/skill-image', files = file)
        response.encoding = 'utf-8'
        self.assertEqual(response.status_code, 415, response.json())


    def test_get_skill_images(self):
        response = requests.get('http://anken_server:5000/skill-images/')
        response.encoding = 'utf-8'
        images_path = response.json()
        self.assertIn('skill.jpg', images_path, response.json())


    def test_post_pieces(self):
        payload = {'name': 'test_first','url_img_skill': 'skill.jpg', 'url_img_project': 'anken.png'}

        response = requests.post('http://anken_server:5000/pieces/', data = json.dumps(payload))
        response.encoding = 'utf-8'
        self.assertEqual(response.status_code, 201, response.json())


    def test_get_pieces(self):
        piece = self._find_piece_by_name('test_first')

        if piece is not None:
            correct = True
            correct = correct and piece['url_img_skill'] == 'skill.jpg'
            correct = correct and piece['url_img_project'] == 'anken.png'
            correct = correct and piece['position'] == 0
            correct = correct and type(piece['id']) is int

            self.assertTrue(correct)


    def test_get_piece(self):
        piece = self._find_piece_by_name('test_first')

        if piece is not None:
            piece_id = piece['id']
            response = requests.get(f'http://anken_server:5000/pieces/{piece_id}')
            response.encoding = 'utf-8'

            correct = True
            correct = correct and piece['url_img_skill'] == 'skill.jpg'
            correct = correct and piece['url_img_project'] == 'anken.png'
            correct = correct and piece['position'] == 0
            correct = correct and piece['id'] == piece_id
            correct = correct and response.status_code == 200

            self.assertTrue(correct, response.json())


    def test_put_piece(self):
        piece = self._find_piece_by_name('test_first')

        if piece is not None:
            payload = {'name': 'test_2nd','url_img_skill': 'skill.jpg', 'url_img_project': 'anken.png'}
            piece_id = piece['id']
            response = requests.put(f'http://anken_server:5000/pieces/{piece_id}', data = json.dumps(payload))
            response.encoding = 'utf-8'

            mod_piece = self._find_piece_by_name('test_2nd')

            if mod_piece is not None:
                correct = True
                correct = correct and mod_piece['url_img_skill'] == piece['url_img_skill']
                correct = correct and mod_piece['url_img_project'] == piece['url_img_project']
                correct = correct and mod_piece['position'] == piece['position']
                correct = correct and mod_piece['id'] == piece['id']

                self.assertTrue(correct)

    def test_delete_piece(self):
        piece = self._find_piece_by_name('test_2nd')

        if piece is not None:
            piece_id = piece['id']
            response = requests.delete(f'http://anken_server:5000/pieces/{piece_id}')
            response.encoding = 'utf-8'

            del_response = requests.get(f'http://anken_server:5000/pieces/{piece_id}')

            self.assertNotEqual(del_response.status_code, 200)


    def _find_piece_by_name(self, name):
        response = requests.get('http://anken_server:5000/pieces/')
        response.encoding = 'utf-8'

        for piece in response.json():
            if piece['name'] == name:
                return piece

        return None


if __name__ == '__main__':
    unittest.main()
