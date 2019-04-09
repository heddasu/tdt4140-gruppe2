from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import Userprofile

class UserprofileSerializer(serializers.ModelSerializer):


    class Meta:
        fields = (
            'user',
            'bio',
            'allergies',
        )
        model = Userprofile

