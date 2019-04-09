from django.urls import path, include
from . import views

urlpatterns = [
    path('userprofiles', views.Userprofiles.as_view()),
    path('userprofiles/<int:pk>/', views.Details.as_view()),
 
]