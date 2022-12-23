from django.urls import re_path, path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html")),
    path("api/v1/all", views.VideoListApiView.as_view(), name="index"),
    # re_path(r"^$", views.index, name="index"),
    re_path(r"^page/(?P<page>[0-9]+)/$", views.show, name="show"),
    re_path(r"^video/(?P<vid>[0-9]+)/$", views.play, name="play"),
]
