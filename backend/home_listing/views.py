from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from .models import Listing
from .serializers import ListingSerializer


def listings(request):
    print("listings view")
    return JsonResponse({})


def listing_detail_view(request, listing_id):
    queryset = Listing.objects.filter(deleted_at__isnull=True)
    listing = get_object_or_404(queryset, pk=listing_id)

    serializer = ListingSerializer(listing)
    return JsonResponse(serializer.data)
