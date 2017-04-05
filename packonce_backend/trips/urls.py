from django.conf.urls import url
from trips import views

urlpatterns = [
    url(r'^trips/$', views.trip_list),
    url(r'^trips/(?P<pk>[0-9]+)/$', views.trip_detail),
]
