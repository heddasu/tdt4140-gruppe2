from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Comment
from .serializers import CommentsSerializer


class Comments(generics.ListCreateAPIView):
    serializer_class = CommentsSerializer
    queryset = Comment.objects.all()


class Details(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentsSerializer
    queryset = Comment.objects.all()