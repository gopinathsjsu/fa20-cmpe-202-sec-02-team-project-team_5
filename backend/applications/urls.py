from django.urls import path
from applications.views import *
from django.conf.urls import url

urlpatterns = [

    url('submit$', SubmitApplicationView.as_view()),
    url('', ListApplications.as_view())
]