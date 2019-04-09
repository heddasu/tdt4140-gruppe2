from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import Comment

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'comment',
            'author',
        )
        model = Comment

