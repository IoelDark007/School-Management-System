# backend/students/views.py
from django.http import JsonResponse
from .models import Student

def get_students(request):
    """
    Handles the student management table (screen2.png)
    Endpoint: /api/students/
    """
    try:
        queryset = Student.objects.all()
        
        student_list = []
        for s in queryset:
            student_list.append({
                "id": f"#STU{s.id:03}",
                "fullName": s.full_name,
                "email": s.email,
                "grade": s.grade_level,
                "enrollmentDate": s.created_at.strftime("%b %d, %Y"),
                "status": s.status,
                "profileImage": s.avatar_url or f"https://api.dicebear.com/7.x/avataaars/svg?seed={s.id}"
            })

        return JsonResponse({
            "responseCode": 0,
            "responseMessage": "Records retrieved successfully",
            "data": student_list,
            "dataCount": queryset.count()
        })

    except Exception as e:
        return JsonResponse({
            "responseCode": 2,
            "responseMessage": "Internal server error occurred while fetching the list.",
            "data": None,
            "dataCount": 0
        }, status=500)


def get_student_detail(request, student_id):
    """
    Handles the specific student profile (screen.png)
    Endpoint: /api/students/<id>/
    """
    try:
        student = Student.objects.filter(id=student_id).first()
        
        if not student:
            return JsonResponse({
                "responseCode": 6, 
                "responseMessage": f"Student with ID {student_id} does not exist.",
                "data": None
            }, status=404)

        data = {
            "fullName": student.full_name,
            "personalDetails": {
                "dateOfBirth": student.date_of_birth.strftime("%d %B %Y") if student.date_of_birth else "N/A",
                "phone": student.phone,
                "email": student.email,
                "address": student.address,
            },
            "stats": {
                "gpa": float(student.current_gpa),
                "attendance": f"{student.attendance_percentage}%"
            },
            "quickNote": "Alex shows strong leadership skills..." 
        }

        return JsonResponse({
            "responseCode": 0,
            "responseMessage": "Success",
            "data": data,
            "dataCount": 1 # Included for consistency
        })

    except Exception as e:
        return JsonResponse({
            "responseCode": 2, 
            "responseMessage": "An internal error occurred while fetching the profile.",
            "data": None,
            "dataCount": 0
        }, status=500)