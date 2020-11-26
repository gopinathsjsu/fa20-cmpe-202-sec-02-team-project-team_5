from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from core.authentications import JWTAuthentication
from .serializers import *
from rest_framework import status
from datetime import datetime


@api_view(['POST', 'GET'])
def favorites_listing(request):
    user = JWTAuthentication.validate_token(request)

    if request.method == 'POST':
        favorite_listing_serializer = CreateFavoriteListingSerializer(data=request.data)
        if favorite_listing_serializer.is_valid():
            favorite_listing_serializer.save(user=user)

        return Response({"status": "listing marked favorite"}, status=status.HTTP_204_NO_CONTENT)

    favorite_listings = FavoriteListing.objects.filter(user=user, deleted_at__isnull=True)

    print("favorite_listings: ", favorite_listings)
    data = FavoriteListingSerializer(favorite_listings, many=True).data
    print("data: ", data)
    return Response(data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def favorites_listing_delete(request, favorite_id):
    user = JWTAuthentication.validate_token(request)

    FavoriteListing.objects.filter(id=favorite_id, user=user).update(deleted_at=datetime.now())

    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST', 'GET'])
def favorites_search(request):
    user = JWTAuthentication.validate_token(request)

    return Response("<H1>This is the user favorites home page</H1>")


@api_view(['DELETE'])
def favorites_search_delete(request):
    user = JWTAuthentication.validate_token(request)

    return Response()




