from rest_framework import serializers


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
