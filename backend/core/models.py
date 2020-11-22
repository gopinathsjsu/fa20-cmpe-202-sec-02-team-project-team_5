"""
This file contains all models designed for core app. It contains both default django models and 
custom designed models which are migrated to PostgresSQL database.
"""

from django.db import models
from django.contrib.postgres.fields.citext import CIEmailField
from django.conf import settings
import datetime

class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True,blank=True)

    class Meta:
        db_table = 'role'
    def __str__(self):
        return self.name


class User(models.Model):
    DEFAULT_ROLE = 'user'
    DEFAULT_USER_STATUS = 'pending'
    DEFAULT_USER_TYPE = 'default'
    
    id = models.AutoField(primary_key=True)
    role = models.ForeignKey(Role,default=DEFAULT_ROLE,on_delete=models.CASCADE)
    user_status = models.ForeignKey('UserStatus',default=DEFAULT_USER_STATUS,on_delete=models.CASCADE)
    user_type = models.ForeignKey('UserType',default=DEFAULT_USER_TYPE,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email_id = CIEmailField(max_length=100,unique=True) # CREATE EXTENSION IF NOT EXISTS citext; 
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True,blank=True)

    class Meta:
        db_table = 'user'

class UserAdditionalInfo(models.Model):
 
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, models.DO_NOTHING)
    sex = models.CharField(max_length=1,blank=True, null=True)
    date_of_birth = models.DateField(default=datetime.date.today)
    credit_score = models.IntegerField(default=700)
    employment_type = models.CharField(max_length=100,null=True,blank=True)
    annual_salary = models.DecimalField(max_digits=6, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True,blank=True)

    class Meta:
        db_table = 'user_additional_info'

class UserStatus(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True,blank=True)

    class Meta:
        db_table = 'user_status'
    def __str__(self):
        return self.name


class UserType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True,blank=True)

    class Meta:
        db_table = 'user_type'
    def __str__(self):
        return self.name
