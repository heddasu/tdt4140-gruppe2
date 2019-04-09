from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Userprofile
from .serializers import UserprofileSerializer

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes


@permission_classes((AllowAny,))
class Userprofiles(generics.ListCreateAPIView):
    serializer_class = UserprofileSerializer
    queryset = Userprofile.objects.all()

@permission_classes((AllowAny,))
class Details(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserprofileSerializer
    queryset = Userprofile.objects.all()
