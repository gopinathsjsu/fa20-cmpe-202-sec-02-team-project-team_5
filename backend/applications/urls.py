from django.urls import path
from applications.views import *
from django.conf.urls import url

urlpatterns = [

    url('user/submit$', SubmitApplicationView.as_view())

]