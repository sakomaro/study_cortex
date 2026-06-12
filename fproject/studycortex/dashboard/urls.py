from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('pomodoro/', views.pomodoro, name='pomodoro'),
    path('clock/', views.clock, name='clock'),
    path('notes/', views.notes, name='notes'),
    path('todo/', views.todo, name='todo'),
]