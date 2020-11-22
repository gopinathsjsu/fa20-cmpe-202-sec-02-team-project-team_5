from django.urls import path
from applications.views import *
from django.conf.urls import url

urlpatterns = [

    url('user/submit-application$', SubmitApplicationView.as_view())

]