from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view

from .models import Listing
from .serializers import ListingSerializer
from .serializers import CreateListingSerializer
from rest_framework import status


@api_view(['POST'])
def listings(request):
    user = request.user
    # listing_type = request.listing_type
    # listings = Listing(listed_by=user, listing_type , home_type , home_status )

    print("data: ", request.data)
    serializer = CreateListingSerializer(data=request.data)


    if serializer.is_valid():
        # print("sdata: ", serializer.data)
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATE)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def listing_detail_view(request, listing_id):
    queryset = Listing.objects.filter(deleted_at__isnull=True)
    listing = get_object_or_404(queryset, pk=listing_id)

    serializer = ListingSerializer(listing)
    return JsonResponse(serializer.data)
