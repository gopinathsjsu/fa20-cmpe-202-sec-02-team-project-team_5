from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from samplerestfulapi.models import SamplerestfulapiDevelopers
from samplerestfulapi.serializers import DevelopersSerializer
from rest_framework.decorators import api_view


from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view


# Create your views here.

@api_view(['GET'])
def developers_list(request):
    if request.method == 'GET':
        developers = SamplerestfulapiDevelopers.objects.all()
        developers_serializer = DevelopersSerializer(developers, many=True)
        return JsonResponse(developers_serializer.data, safe=False)

@api_view(['POST'])
def add_developers(request):
    developers_data = JSONParser().parse(request)
    developers_serializer = DevelopersSerializer(data=developers_data)
    if developers_serializer.is_valid():
        developers_serializer.save()
        return JsonResponse(developers_serializer.data, status=status.HTTP_201_CREATED) 
    return JsonResponse(developers_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_developer(request,sjsuid):
    try: 
        developer = SamplerestfulapiDevelopers.objects.get(sjsuid=sjsuid) 
    except SamplerestfulapiDevelopers.DoesNotExist: 
        return JsonResponse({'message': 'This developer does not exist'}, status=status.HTTP_404_NOT_FOUND)
    developer_data = JSONParser().parse(request) 
    developers_serializer = DevelopersSerializer(developer, data=developer_data)          
    if developers_serializer.is_valid(): 
        developers_serializer.save() 
        return JsonResponse(developers_serializer.data) 
    return JsonResponse(developers_serializer.errors, status=status.HTTP_400_BAD_REQUEST)  

@api_view(['DELETE'])
def remove_developer(request,sjsuid):
    try: 
        developer = SamplerestfulapiDevelopers.objects.get(sjsuid=sjsuid) 
        developer.delete() 
        return JsonResponse({'message': 'Developer deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    except SamplerestfulapiDevelopers.DoesNotExist: 
        return JsonResponse({'message': 'This developer does not exist'}, status=status.HTTP_404_NOT_FOUND)


# def homeStatic(request):
#     # return HttpResponse("Welcome to Django")
#     return JsonResponse({'message': 'Welcome to Django'}, status=status.HTTP_200_OK)

# # method to populate dynamic content on webpage using render
# def homeDynamic(request):
#     return render(request,'home.html',{'Component':'Backend'})

