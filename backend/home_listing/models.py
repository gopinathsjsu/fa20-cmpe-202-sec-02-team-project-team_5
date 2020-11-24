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
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


# HomeType indicated the type of house listed such as Apartment, Town House, Condo etc
class HomeType(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


# HomeStatus indicates the listing type such as Sold, Pending, Rented out, Available etc
class HomeStatus(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name

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
    sqft_area = models.IntegerField(null=True, blank=True)
    bedrooms = models.IntegerField()
    bathroom = models.IntegerField()
    flooring = models.CharField(max_length=100, null=True, blank=True)
    year_built = models.IntegerField()
    kitchen = models.CharField(max_length=100, null=True, blank=True)
    laundry = models.CharField(max_length=100, null=True, blank=True)
    parking_type = models.CharField(max_length=100, null=True, blank=True)
    air_conditioner = models.BooleanField(default=False)
    heater = models.CharField(max_length=100, null=True, blank=True)
    available_date = models.DateTimeField(null=True, blank=True)
    lease_term = models.IntegerField(null=True, blank=True)
    security_deposit = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

    def images(self):
        return [image.url for image in self.image_set.all()]

# HomeSchedule indicates the listing schedule details such as scheduled date and time,
class HomeSchedule(models.Model):
    id = models.AutoField(primary_key=True)
    scheduled_by = models.ForeignKey(User, models.DO_NOTHING)
    listing = models.ForeignKey(Listing, models.DO_NOTHING)
    schedule_datetime = models.DateTimeField()  # Split date and time into 2 fields
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)

# Image has the path to the images for listings
class Image(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey(Listing, models.DO_NOTHING)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    deleted_why = models.TextField(null=True, blank=True)



