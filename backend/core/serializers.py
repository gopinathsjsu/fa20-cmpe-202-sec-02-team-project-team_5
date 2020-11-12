""" 
Serializers are used to connect to apps to external apps via Json data
It helps in data flow in Json formart to and fro communication (Json to Python and vice versa)

"""
from core.models import *
from rest_framework import serializers

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__' 
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

class UserStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStatus
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer()
    user_status = UserStatusSerializer()
    class Meta:
        model = User
        fields = '__all__' 

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name','last_name','email_id','user_type','user_status') 

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ('first_name','last_name','email_id','user_type')

class RetriveUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  ('first_name','last_name','email_id','user_type')

class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType 
        fields = '__all__' 

class UserAdditionalInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAdditionalInfo
        fields = '__all__' 
