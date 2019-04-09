# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from .models import List

# Create your tests here.

#basic tests from tutorial
class TodoModelTest(TestCase):

    @classmethod
    def setUpTestData(cls):
     List.objects.create(title='first list')
     List.objects.create(description='a description here')

    def test_title_content(self):
        list = List.objects.get(id=1)
        expected_object_name = f'{list.title}'
        self.assertEquals(expected_object_name, 'first list')

    def test_description_content(self):
        list = List.objects.get(id=2)
        expected_object_name = f'{list.description}'
        self.assertEquals(expected_object_name, 'a description here')