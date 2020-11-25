from core.models import *
from core.serializers import *
from applications.serializers import *
from home_listing.models import *
from rest_framework import status
from core.authentications import JWTAuthentication
from django.http.response import JsonResponse
from rest_framework.generics import GenericAPIView,CreateAPIView,ListAPIView
from home_finder.utility import Util
from django.shortcuts import get_object_or_404
from django.db.models import Q

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
            Util.send_email('Recieved New Application', 'Please navigate to your listings to review applications'\
            , 'from@gmail.com', [to_email])
            return JsonResponse({'message':'Application submitted successfully'}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'message':'Application submission unsuccessful'},status=status.HTTP_400_BAD_REQUEST)

class ListApplications(GenericAPIView):
    """
    This view is created to allow seller/landlord/realtor to view the submitted application assosiated with their posted listsing.
    """
    def get(self,request):
        user = JWTAuthentication.validate_token(request)
        criterion1 = Q(deleted_at__isnull=True)
        listing_id = int(request.GET.get('listing_id', None))
        criterion2 = Q(home_listing=listing_id)
        querylist = Application.objects.filter(criterion1 & criterion2)

        serializer = ListHomeListingApplications(querylist,many=True)
        result = serializer.data
        for i, app in enumerate(querylist):
            user_info =  UserAdditionalInfo.objects.get(user=app.user)
            user_info_serializer = ListUserAddDeatilsSerializer(user_info)
            result[i]['user_info'] = user_info_serializer.data

        return JsonResponse(result,status=status.HTTP_201_CREATED,safe=False)







