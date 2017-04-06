from django.conf.urls import url, include
from django.contrib import admin
from trip_items import views


urlpatterns = [
    url(r'^trip_items/$', views.TripItemIndex.as_view()),
    url(r'^trip_items/(?P<pk>[0-9]+)/$', views.TripItemDetail.as_view()),
]
