from django.urls import path, include
from . import views

urlpatterns = [
    path('groceries', views.Groceries.as_view()),
    path('groceries/<int:pk>/', views.Details.as_view()),
 
]