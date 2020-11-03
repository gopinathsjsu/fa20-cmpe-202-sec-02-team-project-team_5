from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from core.models import Role
from core.serializers import RoleSerializer,UserSerializer
from rest_framework.decorators import api_view

from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view


# Create your views here.

@api_view(['GET'])
def roles_list(request):
    if request.method == 'GET':
        role = Role.objects.all()
        role_serializer = RoleSerializer(role, many=True)
        return JsonResponse(role_serializer.data, safe=False)


@api_view(['POST'])
def add_user(request):
    user_data = JSONParser().parse(request)
    user_serializer = UserSerializer(data=user_data, partial=True)
    if user_serializer.is_valid():
        user_serializer.save()
        return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED) 
    return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



