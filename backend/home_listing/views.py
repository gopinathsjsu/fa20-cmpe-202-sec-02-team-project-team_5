from django.http import HttpResponse

def listings(request):
    return HttpResponse("<H1>This is the listings home page</H1>")
