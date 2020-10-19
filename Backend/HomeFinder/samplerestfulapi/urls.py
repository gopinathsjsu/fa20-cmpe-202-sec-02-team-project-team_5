from django.urls import path
from samplerestfulapi import views
from django.conf.urls import url

urlpatterns = [

    url(r'^api/developers$', views.developers_list, name='developers_list'),
    url(r'^api/developers/add$', views.add_developers, name='add_developers'),
    url(r'^api/developer/update/(?P<sjsuid>\d+)$', views.update_developer, name='update_developer'),
    url(r'^api/developer/remove/(?P<sjsuid>\d+)$', views.remove_developer, name='remove_developer')  
    
]
