from applications.models import *
from home_listing.models import Listing
from rest_framework import serializers
from core.models import User,UserAdditionalInfo
from core.serializers import UserAdditionalInfoSerializer

class HomeListingFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return Listing.objects.get(id=value)

class CreateApplicationSerializer(serializers.Serializer):
    home_listing = HomeListingFieldSerializer()
    offered_price = serializers.DecimalField(required=False,allow_null=True,max_digits=5, decimal_places=2)

    def create(self, validated_data):
        return Application.objects.update_or_create(user=validated_data['user'], defaults = validated_data)

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('home_listing','status','offered_price','user')

class CreateUserAdditionalInfoSerializer(serializers.Serializer):
    sex = serializers.CharField(required=False,allow_null=True,allow_blank=True)
    date_of_birth = serializers.DateField()
    credit_score =serializers.IntegerField()
    employment_type = serializers.CharField(required=False,allow_null=True,allow_blank=True)
    annual_salary = serializers.DecimalField(max_digits=6, decimal_places=2)

    def create(self, validated_data):
        return UserAdditionalInfo.objects.update_or_create(user=validated_data['user'], defaults = validated_data)