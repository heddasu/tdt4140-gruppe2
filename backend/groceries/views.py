from __future__ import unicode_literals
from django.shortcuts import render
from rest_framework import generics, viewsets
from .models import Grocery 
from .serializers import GrocerySerializer


class Groceries(generics.ListCreateAPIView):
    serializer_class = GrocerySerializer
    queryset = Grocery.objects.all()


class Details(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GrocerySerializer
    queryset = Grocery.objects.all()