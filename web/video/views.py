import binascii
import os
import re

import requests
from django.shortcuts import render
from django.utils import timezone
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .VideoPaginations import VideoCursorPagination
from .models import Video
from .serializers import VideoSerializer


class VideoListApiView(ListAPIView):
    queryset = Video.objects.all().order_by('video_update')
    serializer_class = VideoSerializer
    pagination_class = VideoCursorPagination


class VideoRefreshAPIView(APIView):
    def get_video_link(self, url):
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/60.0.3112.113 Safari/537.36"}

        res = requests.get(url, headers=headers)
        html = res.text

        video_link = re.search("setVideoUrlHigh\('(.*?)'\)", html).group(1)
        return video_link

    def get(self, request, *args, **kwargs):
        print(request.query_params.get("video_id"))
        vid = request.query_params.get("video_id")
        v = Video.objects.filter(id=vid).first()
        print(v)
        v_update = v.updatedAt

        if (timezone.now() - v_update).total_seconds() > 3600:
            print("more than 1 hours  refresh the video link")
            v.video_link = self.get_video_link(v.video_url)
            v.video_recomend = 0
            v.updatedAt = timezone.now()
            v.video_update = timezone.now()
            v.save()

        return Response({"video_link": v.video_link}, status=status.HTTP_200_OK)


# Create your views here.
def create_key():
    return binascii.b2a_base64(os.urandom(50)).decode()


class HomeView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, *args, **kwargs):
        context = super(HomeView, self).get_context_data(*args, **kwargs)
        context["pageTitle"] = "Page | Pornoxeia.com"
        return context


def play(request, vid):
    v = Video.objects.filter(id=vid).first()
    # v_update = v.video_update

    # if (timezone.now() - v_update).total_seconds() > 3600:
    #     print("more than 1 hours  refresh the video link")
    #     # v.video_link = refresh_video_link(v)
    #     v.video_recomend = 0
    #     v.save()
    context = {"video_link": v.video_link, "video_title": v.video_title}
    return render(request, "../templates/play.html", context)

    # return HttpResponse(vid)


def show(request, page):
    page = int(page)
    video_list = Video.objects.all()
    page_num = int(len(video_list) / 18) + 1
    page_show = range(1, 6)
    page_show1 = range(1, page_num)
    video_page_list = video_list[18 * (page - 1) + 1: 18 * page + 1]

    print(page)
    context = {
        "video_page_list": video_page_list,
        "pagenum": page_num,
        "pageshow": page_show,
        "pageshow1": page_show1,
        "cur_page": page,
    }
    return render(request, "../templates/show.html", context)
