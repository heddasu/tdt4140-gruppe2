from django.urls import path, include
from . import views

urlpatterns = [
    path('comments', views.Comments.as_view()),
    path('comments/<int:pk>/', views.Details.as_view()),
 
]