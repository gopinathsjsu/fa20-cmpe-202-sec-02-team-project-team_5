""" 
Serializers are used to connect to apps to external apps via Json data
It helps in data flow in Json formart to and fro communication (Json to Python and vice versa)

"""
from core.models import *
from rest_framework import serializers
from django.contrib.postgres.fields.citext import CIEmailField

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class UserStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStatus
        fields = '__all__'

class RoleFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return Role.objects.get(name=value)

class UserTypeFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return UserType.objects.get(name=value)
        

class UserStatusFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return UserStatus.objects.get(name=value)


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    role = RoleFieldSerializer(required=False)
    user_status = UserStatusFieldSerializer(required=False)
    user_type = UserTypeFieldSerializer(required=False)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email_id = CIEmailField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = '__all__' 

class UserRegistrationSerializer(serializers.ModelSerializer):
    role = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name')
    user_status = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name')
    user_type = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name')
    class Meta:
        model = User
        fields = ('first_name','last_name','email_id','user_type','user_status')
        
class RetriveUsersSerializer(serializers.ModelSerializer):
    user_type = serializers.SlugRelatedField(
    read_only=True,
    slug_field='name')
    class Meta:
        model = User
        fields =  ('id','first_name','last_name','email_id','user_type')

class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType 
        fields = '__all__' 

class UserAdditionalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdditionalInfo
        fields = ('date_of_birth','credit_score','annual_salary') 

class UserLoginSerializer(serializers.ModelSerializer):
    user_type = serializers.SlugRelatedField(
    read_only=True,
    slug_field='name')
    class Meta:
        model = User
        fields =  ('first_name','last_name','email_id','user_type')

class UserStatusUpdateSerializer(serializers.ModelSerializer):
    user_status = UserStatusFieldSerializer()
    class Meta:
        model = User
        fields =  ('id','user_status')
