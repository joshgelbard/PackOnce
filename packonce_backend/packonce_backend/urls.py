from django.conf.urls import url, include
from django.contrib import admin


urlpatterns = [
    url(r'^', include('trips.urls')),
    url(r'^', include('items.urls')),
    url(r'^', include('trip_items.urls'))
]
