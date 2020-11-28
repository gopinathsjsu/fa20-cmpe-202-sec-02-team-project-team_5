from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import api_view
from core.authentications import JWTAuthentication
from datetime import datetime
from .serializers import *
from rest_framework import status




@api_view(['POST', 'GET'])
def listings(request):
    user = JWTAuthentication.validate_token(request)

    if request.method == "POST":
        images_serializer = CreateImagesSerializer(data=dict(request.data))
        request.data.pop("images")
        open_house_serializer = CreateOpenHouseSerializer(data=dict(request.data))
        listing_serializer = CreateListingSerializer(data=request.data)

        if listing_serializer.is_valid() and images_serializer.is_valid() and open_house_serializer.is_valid():

            new_listing = listing_serializer.save(listed_by=user)
            images_serializer.save(listing=new_listing)
            open_house_serializer.save(listing=new_listing)
            new_listing.save()
            return Response(ListingSerializer(new_listing).data, status=status.HTTP_201_CREATED)

        return Response(listing_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        # GET /listings
        user_listings = Listing.objects.filter(listed_by=user, deleted_at__isnull=True)
        return Response(ListingSerializer(user_listings, many=True).data, status=status.HTTP_200_OK)

# get /listings/listing_id/
# @csrf_exempt
@api_view(['PUT', 'GET', 'DELETE'])
def listing_detail_view(request, listing_id):
    print("get/put listing view")
    if request.method == "GET":
        queryset = Listing.objects.filter(deleted_at__isnull=True)
        listing = get_object_or_404(queryset, pk=listing_id)

        serializer = ListingSerializer(listing)
        return Response(serializer.data)
    elif request.method == "PUT":
        return update_listing(request, listing_id)
    else:
        return delete_listing(request, listing_id)

def update_listing(request, listing_id):
    user = JWTAuthentication.validate_token(request)

    queryset = Listing.objects.filter(listed_by=user)
    listing = get_object_or_404(queryset, pk=listing_id)
    request.data.pop("images")
    listing_serializer = CreateListingSerializer(listing, data=request.data)

    if listing_serializer.is_valid():
        print("put is valid")
        updated_listing = listing_serializer.save()
        return Response(ListingSerializer(updated_listing).data, status=status.HTTP_200_OK)

    return Response(listing_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def delete_listing(request, listing_id):
    user = JWTAuthentication.validate_token(request)

    queryset = Listing.objects.filter(listed_by=user)
    listing = get_object_or_404(queryset, pk=listing_id)
    listing.deleted_at = datetime.now()
    listing.deleted_why = request.data.get("deleted_why", "user deleted")
    listing.save()

    return Response({"status": "Successfully deleted"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def listing_schedule(request, listing_id):
    user = JWTAuthentication.validate_token(request)
    schedule_serializer = CreateListingScheduleSerializer(data=request.data)

    if schedule_serializer.is_valid():
        try:
            if HomeSchedule.objects.filter(
                        listing_id=listing_id,
                        schedule_visits_date=request.data.get("schedule_visits_date"),
                        schedule_visits_time=request.data.get("schedule_visits_time")
            ).exists():
                return Response({"status": "Schedule already booked"}, status=status.HTTP_400_BAD_REQUEST)
            schedule_serializer.save(scheduled_by=user, listing_id=listing_id)

        except ObjectDoesNotExist as e:
            Response({}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"status": "Successfully scheduled"}, status=status.HTTP_200_OK)

