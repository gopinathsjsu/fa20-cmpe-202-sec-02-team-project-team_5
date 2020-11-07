""" 
Serializers are used to connect to apps to external apps via Json data
It helps in data flow in Json formart to and fro communication (Json to Python and vice versa)

"""

from rest_framework import serializers
from core.models import *

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        # to serialize all columns in role table 
        fields = '__all__' 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__' 


class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ('email_id', 'password')

class CustomeResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    message = serializers.CharField(max_length=200)
    user_id = serializers.IntegerField()

class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType 
        fields = '__all__' 

class UserStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStatus
        fields = '__all__' 

class UserAdditionalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdditionalInfo
        fields = '__all__' 
