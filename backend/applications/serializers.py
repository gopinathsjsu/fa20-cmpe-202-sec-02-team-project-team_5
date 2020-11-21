from applications.models import *
from rest_framework import serializers
from core.models import User,UserAdditionalInfo
from core.serializers import UserAdditionalInfoSerializer




class SubmitApplicationSerializer(serializers.ModelSerializer):
    user_info = UserAdditionalInfoSerializer()
    class Meta:
        model = Application
        fields = ('home_listing')

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
# class 