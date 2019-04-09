# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from .models import List 
from .serializers import ListSerializer

from django.shortcuts import render
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt

from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, viewsets, status
from rest_framework.status import(
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User

from groceries.models import Grocery 

@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    
    if username is None or password is None:
        return Response({'error':'Please provide both username and password'},
        status=HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error':'Invalid Credintials'},
        status = HTTP_404_NOT_FOUND)
    token, _= Token.objects.get_or_create(user=user)
    return Response({'token':token.key, 'user': username},
    status=HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def create_auth(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid(raise_exception=True):
        serialized.save()
        return Response(serialized.data, status = status.HTTP_201_CREATED)


@permission_classes((AllowAny,))
class users(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

@permission_classes((AllowAny,))
class userDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

#generating  lists of listobjects
@permission_classes((AllowAny,))
class ShoppingList(generics.ListCreateAPIView):
    serializer_class = ListSerializer
    queryset = List.objects.all()
    permission_classes = (AllowAny,)

@permission_classes((AllowAny,))
class DetailList(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ListSerializer
    queryset = List.objects.all()
    permission_classes = (AllowAny,)



# Create your views here.

# const user = await fetch('/api/register?format=json', { method: 'POST', body: JSON.stringify({ password: 'hei', username: 'klomp' }), headers: { 'Content-Type': 'application/json' } });
