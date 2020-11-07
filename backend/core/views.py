from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from core.models import *
from core.serializers import *
from rest_framework.views import APIView

from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from django.contrib.auth.hashers import make_password,check_password

# Core app views. All core app views are authenticated using JWT token authorization.
class UserRegistrationView(generics.CreateAPIView):
    """
    This view is created for any user to register to HomeFinder application. 
    Validated the user infomation and adds the user to database with pending status.
    """
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        try:
            data['password'] = make_password(data['password'])
            serializer.save()
            userId = serializer.data['id']
            response = CustomeResponse(True,'User registration successfull',userId).getSerializedData()
            return JsonResponse(response, status=status.HTTP_201_CREATED)
        except Exception as ex:
            response = CustomeResponse(False,'Unable to register user').getSerializedData()
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST)
        
# get users
class UserLoginView(APIView):
    """
    This view is created for any user login to HomeFinder application. 
    Authenticates and authorizes the username and password.
    """
    serializer_class = UserLoginSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        emailid = request.data['email_id']
        password = request.data['password']
        if emailid and password:
            try:
                user_info = User.objects.get(email_id=emailid)
                if user_info:
                    encrypted_password = user_info.password
                    res = check_password(password,encrypted_password)
                    userId = user_info.id
                    if res:
                        response = CustomeResponse(True,'User login successfull',userId).getSerializedData()
                        return JsonResponse(response, status=status.HTTP_201_CREATED)
                    else:
                        error_response = CustomeResponse(False,'Password does not match').getSerializedData()
                        return JsonResponse(error_response, status=status.HTTP_412_PRECONDITION_FAILED)
                else:
                    error_response = CustomeResponse(False,'User not found').getSerializedData()
                    return JsonResponse(error_response, status=status.HTTP_400_BAD_REQUEST)
            except Exception as ex:
                error_response = CustomeResponse(False,'Unable to fetch user info').getSerializedData()
                return JsonResponse(error_response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            error_response = CustomeResponse(False,'Missing login information').getSerializedData()
            return JsonResponse(error_response, status=status.HTTP_400_BAD_REQUEST)

class CustomeResponse(object):
    """
    This class allows to creates and returns custom JSON response 
    """
    def __init__(self,success = False,message='',user_id = 0):
        self.success = success
        self.message = message
        self.user_id = user_id

    
    def getSerializedData(self):
            response_serializer = CustomeResponseSerializer(self)
            return response_serializer.data





