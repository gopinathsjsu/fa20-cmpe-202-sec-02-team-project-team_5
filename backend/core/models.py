"""
This file contains all models designed for core app. It contains both default django models and 
custom designed models which are migrated to PostgresSQL database.
"""

from django.db import models
from django.contrib.postgres.fields.citext import CIEmailField

# Default django models
class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'

# Custom HomeFinder models for core app

class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True,null=True)
    is_active = models.BooleanField(default=True,null=True)

    class Meta:
        db_table = 'role'


class User(models.Model):
    DEFAULT_ROLE = 2
    DEFAULT_USER_STATUS = 1
    DEFAULT_USER_TYPE = 2
    
    id = models.AutoField(primary_key=True)
    role = models.ForeignKey(Role,default=DEFAULT_ROLE,on_delete=models.CASCADE)
    user_status = models.ForeignKey('UserStatus', null=True,default=DEFAULT_USER_STATUS,on_delete=models.CASCADE)
    user_type = models.ForeignKey('UserType', blank=True, null=True,default=DEFAULT_USER_TYPE,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email_id = CIEmailField(max_length=100,unique=True) # CREATE EXTENSION IF NOT EXISTS citext; 
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True,null=True)
    created_datetime = models.DateTimeField(auto_now_add=True,null=True)

    class Meta:
        db_table = 'user'


class UserAdditionalInfo(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, models.DO_NOTHING)
    sex = models.CharField(max_length=1, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    credit_score = models.IntegerField(blank=True, null=True)
    employment_type = models.CharField(max_length=100, blank=True, null=True)
    annual_salary = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'user_additional_info'


class UserAdditionalInfoLog(models.Model):
    id = models.AutoField(primary_key=True)
    user_additional_info_id = models.BigIntegerField()
    user_id = models.BigIntegerField()
    sex = models.CharField(max_length=1, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    credit_score = models.IntegerField(blank=True, null=True)
    employment_type = models.CharField(max_length=100, blank=True, null=True)
    annual_salary = models.IntegerField(blank=True, null=True)
    reason = models.CharField(max_length=100)
    created_by = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True,null=True)

    class Meta:
        db_table = 'user_additional_info_log'


class UserLog(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.BigIntegerField()
    role_id = models.IntegerField()
    user_status_id = models.IntegerField()
    user_type_id = models.IntegerField(blank=True, null=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email_id = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True,null=True)
    created_datetime = models.DateTimeField(auto_now_add=True,null=True)
    reason = models.CharField(max_length=100)
    created_by = models.IntegerField(default=True,null=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)

    class Meta:
        db_table = 'user_log'


class UserStatus(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True,null=True)
    is_active = models.BooleanField(default=True,null=True)

    class Meta:
        db_table = 'user_status'


class UserType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True,null=True)
    created_date = models.DateTimeField(auto_now_add=True,null=True)
    deleted_why = models.CharField(max_length=100, blank=True, null=True)
    deleted_at = models.DateTimeField(auto_now_add=True,null=True)

    class Meta:
        db_table = 'user_type'
