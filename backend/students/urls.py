# backend/students/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # This matches: http://127.0.0.1:8000/api/students/
    path('', views.get_students, name='get_students'),
    
    # This matches: http://127.0.0.1:8000/api/students/1/
    path('<int:student_id>/', views.get_student_detail, name='get_student_detail'),
]