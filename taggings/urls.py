from django.conf.urls import url
from taggings import views

urlpatterns = [
    url(r'^taggings/$', views.TaggingIndex.as_view()),
    url(r'^tag/$', views.TaggingTrip.as_view()),
]
