from django.shortcuts import render
from django.http import HttpResponse
from .models import User
from .serializers import UserSerializer
from rest_framework import generics
# Create your views here.

def homePageView(request):
    return HttpResponse("Hello World!!")

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
