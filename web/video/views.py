import binascii
import os

from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.generic import TemplateView

from .models import Video
from .serializers import VideoSerializer


class VideoListApiView(APIView):
    def get(self, request, *args, **kwargs):
        video_list = Video.objects.order_by("video_update")[:20]
        serializer = VideoSerializer(video_list, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


# Create your views here.
def create_key():
    return binascii.b2a_base64(os.urandom(50)).decode()


class HomeView(TemplateView):
    template_name = "index.html"
    def get_context_data(self, *args, **kwargs):
        context = super(HomeView, self).get_context_data(*args, **kwargs)
        context["pageTitle"] = "Home | Pornoxeia.com"
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
    video_page_list = video_list[18 * (page - 1) + 1 : 18 * page + 1]

    print(page)
    context = {
        "video_page_list": video_page_list,
        "pagenum": page_num,
        "pageshow": page_show,
        "pageshow1": page_show1,
        "cur_page": page,
    }
    return render(request, "../templates/show.html", context)
