from rest_framework import serializers
from .models import Listing, HomeStatus
from core.models import User


class ImageSerializer(serializers.Serializer):
    url = serializers.URLField()


class ListingSerializer(serializers.Serializer):
    city = serializers.CharField()
    state = serializers.CharField()
    country = serializers.CharField()
    bedrooms = serializers.IntegerField()
    bathroom = serializers.IntegerField()
    year_built = serializers.IntegerField()
    home_type = serializers.CharField()
    home_status = serializers.CharField()
    description = serializers.CharField()
    zip_code = serializers.CharField()
    street_address = serializers.CharField()
    air_conditioner = serializers.BooleanField()
    heater = serializers.CharField()
    price = serializers.IntegerField()
    flooring = serializers.CharField()
    sqft_area = serializers.IntegerField()
    kitchen = serializers.CharField()
    laundry = serializers.CharField()
    parking_type = serializers.CharField()
    listed_by = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField()
    images = serializers.SerializerMethodField()

    lease_term = serializers.IntegerField()
    available_date = serializers.DateTimeField()
    security_deposit = serializers.IntegerField()

    def get_listed_by(self, obj):
        user = obj.listed_by
        return "{} {}".format(user.first_name, user.last_name)

    def get_images(self, obj):
        return ImageSerializer(obj.image_set, many=True).data


class HomeStatusRelatedField(serializers.RelatedField):
    def to_native(self, value):
        print("value: ", value)
        return HomeStatus.objects.get(name=value)


class CreateListingSerializer(serializers.Serializer):
    listed_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    listing_type = serializers.StringRelatedField()
    home_type = serializers.StringRelatedField()
    home_status = HomeStatusRelatedField(read_only=True)
    description = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    zip_code = serializers.CharField()
    street_address = serializers.CharField()
    city = serializers.CharField()
    state = serializers.CharField()
    country = serializers.CharField()
    price = serializers.IntegerField()
    bedrooms = serializers.IntegerField()
    bathroom = serializers.IntegerField()
    flooring = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    sqft_area = serializers.IntegerField()
    year_built = serializers.IntegerField(allow_null=True)
    kitchen = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    laundry = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    parking_type = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    air_conditioner = serializers.BooleanField(required=False, allow_null=True)
    heater = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    available_date = serializers.DateTimeField(required=False, allow_null=True)
    lease_term = serializers.IntegerField(required=False, allow_null=True)
    security_deposit = serializers.IntegerField(required=False, allow_null=True)


    # def get_home_status(self, obj):
    #     print("obj: ", obj)
    #     return HomeStatus.objects.get(name=obj["home_sta"])


    def create(self, validated_data):
        return Listing.objects.create(**validated_data)

    # class Meta:
    #     model = Listing
