from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def favorites(request):
    return HttpResponse("<H1>This is the user favorites home page</H1>")
