from django.db import models
from core.models import User

# Create your models here.

# listing type indicates the listing type as Rent, Sale.
class ListingType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
    deleted_why = models.TextField(null=True)


# HomeType indicated the type of house listed such as Apartment, Town House, Condo etc
class HomeType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
    deleted_why = models.TextField(null=True)


# HomeStatus indicates the listing type such as Sold, Pending, Rented out, Available etc
class HomeStatus(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
    deleted_why = models.TextField(null=True)

# listing has the details of the listing
class Listing(models.Model):
    id = models.AutoField(primary_key=True)
    listed_by = models.ForeignKey(User, models.DO_NOTHING)
    listing_type = models.ForeignKey(ListingType, models.DO_NOTHING)
    home_type = models.ForeignKey(HomeType, models.DO_NOTHING)
    home_status = models.ForeignKey(HomeStatus, models.DO_NOTHING)
    description = models.TextField()
    zip_code = models.CharField(max_length=10)
    street_address = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    price = models.IntegerField()
    sqft_area = models.IntegerField(null=True)
    bedrooms = models.IntegerField()
    bathroom = models.IntegerField()
    flooring = models.CharField(max_length=100, null=True)
    year_built = models.IntegerField()
    kitchen = models.CharField(max_length=100, null=True)
    laundry = models.CharField(max_length=100, null=True)
    parking_type = models.CharField(max_length=100, null=True)
    air_conditioner = models.CharField(max_length=100, null=True)
    heater = models.CharField(max_length=100, null=True)
    available_date = models.DateTimeField(null=True)
    lease_term = models.IntegerField(null=True)
    security_deposit = models.IntegerField(null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
    deleted_why = models.TextField(null=True)


# HomeSchedule indicates the listing schedule details such as scheduled date and time,
class HomeSchedule(models.Model):
    id = models.AutoField(primary_key=True)
    scheduled_by = models.ForeignKey(User, models.DO_NOTHING)
    listing = models.ForeignKey(Listing, models.DO_NOTHING)
    schedule_datetime = models.DateTimeField()
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
    deleted_why = models.TextField(null=True)

# Image has the path to the images for listings
class Image(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey(Listing, models.DO_NOTHING)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField()



