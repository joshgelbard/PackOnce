from django.conf.urls import url, include
from django.contrib import admin
from items import views


urlpatterns = [
    url(r'^items/$', views.ItemIndex.as_view()),
    url(r'^items/(?P<pk>[0-9]+)/$', views.ItemDetail.as_view()),
]
