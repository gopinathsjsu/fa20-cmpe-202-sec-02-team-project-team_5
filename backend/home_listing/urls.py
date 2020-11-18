from django.conf.urls import url
from django.urls import path

from . import views

urlpatterns = [
    url(r'^/$', views.listings, name='listings'),
    path('<int:listing_id>/', views.listing_detail_view),
]