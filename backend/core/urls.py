from django.urls import path
from . import views
from django.conf.urls import url

urlpatterns = [

    url('roles$', views.roles_list, name='roles_list')
    
]
