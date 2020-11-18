import json
import jwt
from core.models import *
from core.serializers import *
from django.conf import settings
from rest_framework import status
from django.core import serializers
from django.http import HttpResponse
from rest_framework.response import Response
from core.authentications import JWTAuthentication
from django.http.response import JsonResponse
from rest_framework.generics import GenericAPIView,CreateAPIView,ListAPIView
from django.contrib.auth.hashers import make_password,check_password