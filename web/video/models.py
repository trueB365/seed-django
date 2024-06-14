from django.db import models
from datetime import datetime

# Create your models here.


from django.db import models
from django.utils import timezone


class Video(models.Model):
    id = models.BigAutoField(primary_key=True)
    video_link = models.TextField(null=True, blank=True)
    video_image = models.TextField(null=True, blank=True)
    video_length = models.CharField(max_length=255)
    video_title = models.TextField(null=True, blank=True)
    video_update = models.DateTimeField(default=timezone.now)
    video_day = models.DateField(auto_now_add=True)
    video_keyword = models.TextField(null=True, blank=True)
    video_quality = models.IntegerField(default=0)
    video_url = models.TextField(null=True, blank=True)
    video_source = models.CharField(max_length=255)
    video_recomend = models.IntegerField(default=0)
    createdAt = models.DateTimeField(default=timezone.now)
    updatedAt = models.DateTimeField(default=timezone.now)
    deletedAt = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return "video name: {}".format(self.video_title)
