# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

from groceries.models import Grocery

from django.contrib.auth.models import User

from comments.models import Comment



# Create your models here.
class List(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    groceries = models.ManyToManyField(Grocery, blank=True, null=True)
    users = models.ManyToManyField(User, blank=True, null=True)
    author = models.ForeignKey(User, blank=True, null=True, on_delete=models.DO_NOTHING, related_name='author')
    comments = models.ManyToManyField(Comment, blank=True, null=True)

    def __str__(self):
        return self.title
    
        
