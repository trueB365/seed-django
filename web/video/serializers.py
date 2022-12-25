from rest_framework import serializers
from .models import Video


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ["id",
                  "video_link",
                  "video_image",
                  "video_length",
                  "video_title",
                  "video_update",
                  "video_day",
                  "video_keyword",
                  "video_quality",
                  "video_url",
                  "video_source",
                  "video_recomend",
                  "createdAt",
                  "updatedAt"]
