import json
import jwt
from core.models import *
from core.serializers import *
from applications.serializers import *
from django.conf import settings
from rest_framework import status
from django.core import serializers
from django.http import HttpResponse
from rest_framework.response import Response
from core.authentications import JWTAuthentication
from django.http.response import JsonResponse
from rest_framework.generics import GenericAPIView,CreateAPIView,ListAPIView
from django.contrib.auth.hashers import make_password,check_password


class SubmitApplicationView(GenericAPIView):
    """
    This view is created to allow user to submit a rental or buying application for specific home listing.
    """
    def post(self, request):
        user = JWTAuthentication.validate_token(request)
        serializer = SubmitApplicationSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            serializer.save()
            user_application = Application.objects.get(user=user.id)
            serializer = ApplicationSerializer(user_application)
            response_data = {'message':'Application submission successful','application_details': serializer.data}
            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors,status=status.HTTP_400_BAD_REQUEST)