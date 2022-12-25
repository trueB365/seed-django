from django.urls import re_path, path
from . import views

urlpatterns = [
    path("", views.HomeView.as_view()),
    path("api/v1/all", views.VideoListApiView.as_view(), name="index"),
    # re_path(r"^$", views.index, name="index"),
    re_path(r"^page/(?P<page>[0-9]+)/$", views.show, name="show"),
    re_path(r"^video/(?P<vid>[0-9]+)/$", views.play, name="play"),
]
