from rest_framework import serializers
"from rest_framework_jwt.settings import api_settings"
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .models import List

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'description',
            'groceries',
            'users',
            'author',
            'comments',
        )
        model = List

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()

        return user
    class Meta:
        model = User
        fields = ("id", "username", "password", "is_staff")
        