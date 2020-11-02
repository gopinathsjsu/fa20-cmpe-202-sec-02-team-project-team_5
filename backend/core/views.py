from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from core.models import Role
from core.serializers import RoleSerializer
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






