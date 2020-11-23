""" 
Serializers are used to connect to apps to external apps via Json data
It helps in data flow in Json formart to and fro communication (Json to Python and vice versa)

"""
from core.models import *
from rest_framework import serializers
from django.contrib.postgres.fields.citext import CIEmailField

class RoleFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return Role.objects.get(name=value)

class UserTypeFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return UserType.objects.get(name=value)
        

class UserStatusFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return UserStatus.objects.get(name=value)


class UserSerializer(serializers.Serializer):
    role = RoleFieldSerializer(required=False)
    user_status = UserStatusFieldSerializer(required=False)
    user_type = UserTypeFieldSerializer(required=False)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email_id = serializers.CharField()
    password = serializers.CharField()

    def create(self, validated_data):
        return User.objects.create(**validated_data)

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
        exclude = ('id','password')
        
class RetriveUsersSerializer(serializers.ModelSerializer):
    user_type = serializers.SlugRelatedField(
    read_only=True,
    slug_field='name')
    class Meta:
        model = User
        fields =  ('id','first_name','last_name','email_id','user_type')

class UserAdditionalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdditionalInfo
        fields = ('sex','date_of_birth','credit_score','annual_salary') 

class UserLoginSerializer(serializers.ModelSerializer):
    user_type = serializers.SlugRelatedField(
    read_only=True,
    slug_field='name')
    class Meta:
        model = User
        fields =  ('first_name','last_name','email_id','user_type')

class UserStatusUpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user_status = UserStatusFieldSerializer()
    role = RoleFieldSerializer(required=False)
    user_status = UserStatusFieldSerializer(required=False)
    user_type = UserTypeFieldSerializer(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email_id = serializers.CharField(required=False)
    password = serializers.CharField(required=False)

    def create(self, validated_data):
        return User.objects.create(**validated_data)