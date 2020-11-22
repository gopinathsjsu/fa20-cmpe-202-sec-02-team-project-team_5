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

# Core app views. All core app views are authenticated using JWT token authorization.
class UserRegistrationView(GenericAPIView):
    """
    This view is created for any user to register to HomeFinder application. 
    Validated the user infomation and adds the user to database with pending status.
    """
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            data['password'] = make_password(data['password'])
            serializer.save()
            user_info = User.objects.get(email_id=data['email_id'])
            serializer = UserRegistrationSerializer(user_info)
            access_token = JWTAuthentication.generate_access_token(user_info.id)
            response_data = {'message':'User registration successful','user_details': serializer.data,'token': access_token}
            return JsonResponse(response_data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(GenericAPIView):
    """
    This view is created to validate user login.
    """
    def post(self,request):
        data = request.data
        email_id = data.get('email_id')
        password = data.get('password')
        if email_id and password:
            try:
                user = User.objects.get(email_id=email_id)     
                if user:
                    encrypted_password = user.password
                    res = check_password(password,encrypted_password)
                    if res:
                        access_token = JWTAuthentication.generate_access_token(user.id)
                        user_serializer = UserLoginSerializer(user)
                        response_data = {'message':'Login successful','user_details': user_serializer.data, 'token': access_token}
                        return JsonResponse(response_data, status=status.HTTP_200_OK)
                    else:
                        return JsonResponse({'message': 'Invalid password'}, status=status.HTTP_412_PRECONDITION_FAILED)
            except Exception:
                return JsonResponse({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return JsonResponse({'message': 'Provide login details'}, status=status.HTTP_400_BAD_REQUEST)

class PendingUserView(GenericAPIView):
    """
    This view is created for Admin to retrive all users with pending status.
    """
    def get(self, request):
        admin = JWTAuthentication.validate_token(request)
        if JWTAuthentication.isAdmin(admin.id):
            try:
                pending_users = User.objects.filter(user_status__name='pending')  
                if pending_users:
                    serializer = RetriveUsersSerializer(pending_users,many=True)
                    response_data = {'message':'Users retrival succesful','users_list': serializer.data}
                    return JsonResponse(response_data,status=status.HTTP_200_OK,safe=False)
                else:                    
                    return JsonResponse({'message': 'No user found with pending status'}, status=status.HTTP_404_NOT_FOUND)
            except Exception:
                return JsonResponse({'message': 'Unable to process the request'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return JsonResponse({'message': 'Admin authentication failed'}, status=status.HTTP_412_PRECONDITION_FAILED)

class UpdateUserStatusView(GenericAPIView):
    """
    This view allows Admin to approve or reject the users whose registeration status is pending
    """
    def put(self, request):
        data = request.data
        user_id = data.get('user_id')
        user_status = data.get('user_status')
        if user_id and user_status:
            admin = JWTAuthentication.validate_token(request)      
            if JWTAuthentication.isAdmin(admin.id):
                try:
                    user_info = User.objects.get(id=user_id)
                    if user_info:
                        user_info.user_status_id = user_status
                        user_info.save()
                        return JsonResponse({'message': 'Update successful'}, status=status.HTTP_201_CREATED)
                    else:
                        return JsonResponse({'message': 'No user found'}, status=status.HTTP_404_NOT_FOUND)
                except Exception:
                    return JsonResponse({'message': 'Unable to process the request'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return JsonResponse({'message': 'Admin authentication failed'}, status=status.HTTP_412_PRECONDITION_FAILED)
        else:
            return JsonResponse({'message': 'Provide user details'}, status=status.HTTP_400_BAD_REQUEST)
