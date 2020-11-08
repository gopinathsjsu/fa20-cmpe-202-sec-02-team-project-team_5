from django.urls import path
from core.views import *
from django.conf.urls import url

urlpatterns = [

    url('register$', UserRegistrationView.as_view()),
    url('login$', UserLoginView.as_view())
]
