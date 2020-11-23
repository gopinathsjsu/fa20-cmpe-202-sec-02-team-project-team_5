from core.models import *
from core.serializers import *
from applications.serializers import *
from home_listing.models import *
from rest_framework import status
from core.authentications import JWTAuthentication
from django.http.response import JsonResponse
from rest_framework.generics import GenericAPIView,CreateAPIView,ListAPIView
from home_finder.utility import Util

class SubmitApplicationView(GenericAPIView):
    """
    This view is created to allow user to submit a rental or buying application for specific home listing.
    """
    def post(self, request):
        user = JWTAuthentication.validate_token(request)
        application_data = request.data['application_details']
        home_listing_id = application_data['home_listing']
        additional_info_serializer = CreateUserAdditionalInfoSerializer(data=request.data['user_details'])
        application_serializer = CreateApplicationSerializer(data=request.data['application_details'])
        
        if additional_info_serializer.is_valid() and application_serializer.is_valid():
            application = application_serializer.save(user=user)
            user_application = ApplicationSerializer(application[0])
            user_additional_info = additional_info_serializer.save(user=user)
            user_info = UserAdditionalInfoSerializer(user_additional_info[0])
            to_email = Listing.objects.get(id=home_listing_id).listed_by.email_id
            Util.send_email('subject', 'body of the message', 'from@gmail.com', [to_email])
            return JsonResponse({'message':'Application submission successful'}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'message':'Application submission unsuccessful'},status=status.HTTP_400_BAD_REQUEST)      