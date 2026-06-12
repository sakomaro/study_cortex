from django.shortcuts import render

def home(request):
    return render(request, 'dashboard/index.html')

def pomodoro(request):
    return render(request, 'dashboard/ptimer.html')

def clock(request):
    return render(request, 'dashboard/clock.html')

def notes(request):
    return render(request, 'dashboard/notes.html')

def todo(request):
    return render(request, 'dashboard/todo.html')