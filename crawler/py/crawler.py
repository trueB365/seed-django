import os
import random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

import django
django.setup()


from crawler.py.app import xxx_crawler, models
from crawler.py.app import hub_crawler
import time
from datetime import date


T = 3600
video_crawlers_item = {
    "pronhub": hub_crawler.Pronhub,
    "xvideos": xxx_crawler.XVideosCrawler
}

key_words_1 = [
    "chinese couples",
    "chinese",
    "taiwan",
    "korea",
    "china",
    "chinese girl",
    "asia",
    "asia girl",
]
key_words_2 = ["3p", "blow job", "sm", "fuck", "girl", "beautiful", "women", "party"]


def wash_video(days=1):
    for v in models.Video.objects.all():
        _days = (date.today() - v.video_day).days
        if _days > days:
            v.delete()
        elif _days == days:
            v.video_recomend = 1  # 不推荐


def sleep_activate_orm(t):  # t 为小时数
    for i in range(t):
        time.sleep(T)
        print(models.Video.objects.all().count())


if __name__ == "__main__":

    xxx = xxx_crawler.XVideosCrawler()
    # hub = Pronhub()
    T = 60
    while True:
        m = 0
        for i, j in zip(key_words_1, key_words_2):
            v_size = len(models.Video.objects.all())
            print(f"Table size：{v_size}")
            k = random.randint(1, 20)
            # hub.insert_video(i, k)
            # hub.insert_video(j, k)
            print(f"Run again in {T}")
            time.sleep(T)
            xxx.insert_video(i, k)
            xxx.insert_video(j, k)
            #     for obj in Video.objects.order_by("video_update")[:v_size/]:
            #         obj.delete()
            sleep_activate_orm(11)  # 需
            m += 1
            if m == 2:
                wash_video(days=1)
                m = 0
