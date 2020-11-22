from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from core.authentications import JWTAuthentication

from .models import Listing
from .serializers import ListingSerializer
from .serializers import *
from rest_framework import status


@api_view(['POST'])
def listings(request):
    user = JWTAuthentication.validate_token(request)
    images_serializer = CreateImagesSerializer(data=dict(request.data))
    request.data.pop("images")
    listing_serializer = CreateListingSerializer(data=request.data)

    if listing_serializer.is_valid() and images_serializer.is_valid():
        new_listing = listing_serializer.save(listed_by=user)
        images_serializer.save(listing=new_listing)
        return JsonResponse(ListingSerializer(new_listing).data, status=status.HTTP_201_CREATED)

    return JsonResponse(images_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# get /listings/listing_id/
def listing_detail_view(request, listing_id):
    queryset = Listing.objects.filter(deleted_at__isnull=True)
    listing = get_object_or_404(queryset, pk=listing_id)

    serializer = ListingSerializer(listing)
    return JsonResponse(serializer.data)
