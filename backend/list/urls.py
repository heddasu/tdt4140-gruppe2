from django.urls import path, include
from django.contrib import admin
from . import views
from .views import login, create_auth, users

# what you can put after api/ - example api/login or api/sampleapi
urlpatterns = [
    path('', views.ShoppingList.as_view()),
    path('<int:pk>/', views.DetailList.as_view()),
    path('login', login),
    path('register', create_auth),
    path('users', views.users.as_view()),
    path('users/<int:pk>/', views.userDetailView.as_view()),
]
