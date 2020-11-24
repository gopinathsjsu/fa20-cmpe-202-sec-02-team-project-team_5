from rest_framework import serializers
from .models import *
from core.models import User


class ImageSerializer(serializers.Serializer):
    url = serializers.URLField()


class ListingSerializer(serializers.Serializer):
    id = serializers.IntegerField()
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


class HomeStatusFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return HomeStatus.objects.get(name=value)


class HomeTypeFieldSerializer(serializers.Field):
    def to_internal_value(self, value):
        return HomeType.objects.get(name=value)


class ListingTypeSerializer(serializers.Field):
    def to_internal_value(self, value):
        return ListingType.objects.get(name=value)


class CreateImagesSerializer(serializers.Serializer):
    images = serializers.ListField(child=serializers.URLField())

    def create(self, validated_data):
        print("create images validated data: ", validated_data)

        image_objs = []
        for image_url in validated_data["images"]:
            image_objs.append(
                Image(url=image_url, listing=validated_data["listing"])
            )

        return Image.objects.bulk_create(image_objs)


class CreateListingSerializer(serializers.Serializer):

    listing_type = ListingTypeSerializer()
    home_type = HomeTypeFieldSerializer()
    home_status = HomeStatusFieldSerializer()
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


    def create(self, validated_data):
        return Listing.objects.create(**validated_data)

    def update(self, instance, validated_data):
        print("validated_data", validated_data)
        Listing.objects.filter(id=instance.id).update(**validated_data)
        # listing.save()
        instance.refresh_from_db()

        return instance

