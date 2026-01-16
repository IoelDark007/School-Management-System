from django.db import models

class Student(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
        ('Suspended', 'Suspended'),
    ]

    # Fields for Student Management 
    full_name = models.CharField(max_length=255) # fullName
    email = models.EmailField(unique=True)
    grade_level = models.CharField(max_length=50) # grade
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    avatar_url = models.URLField(blank=True) # profileImage
    
    # Fields for Student Profile 
    student_id_alt = models.CharField(max_length=20, unique=True) # studentId (e.g., 2023-8492)
    date_of_birth = models.DateField(null=True)
    phone = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    guardian_name = models.CharField(max_length=255, blank=True)
    
    # Stats
    current_gpa = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    attendance_percentage = models.IntegerField(default=100)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name