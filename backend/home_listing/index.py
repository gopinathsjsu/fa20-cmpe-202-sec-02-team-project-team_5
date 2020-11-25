# index.py
from algoliasearch_django import AlgoliaIndex
from algoliasearch_django.decorators import register
from .models import Listing, Image

#
@register(Listing)
class ListingIndex(AlgoliaIndex):
    fields = ('listed_by', 'listing_type', 'home_type', 'home_status', 'description',
              'zip_code', 'street_address', 'city', 'state', 'country', 'price', 'sqft_area', 'bedrooms',
                'bathroom', 'flooring', 'year_built', 'kitchen', 'laundry', 'parking_type', 'air_conditioner', 'heater',
                'available_date', 'lease_term', 'security_deposit', 'images', 'is_active', 'created_at', 'updated_at', 'deleted_at',
                'deleted_why', 'open_houses')

    settings = {'searchableAttributes': ['listed_by', 'listing_type', 'home_type', 'home_status', 'description',
              'zip_code', 'street_address', 'city', 'state', 'country', 'price', 'sqft_area', 'bedrooms',
                'bathroom', 'flooring', 'year_built', 'kitchen', 'laundry', 'parking_type', 'air_conditioner', 'heater',
                'available_date', 'lease_term', 'security_deposit', 'images', 'is_active', 'created_at', 'open_houses',
                'updated_at', 'deleted_at', 'deleted_why']}
