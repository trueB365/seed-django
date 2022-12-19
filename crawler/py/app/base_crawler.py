import requests
import lxml.html


class BaseCrawler:
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/60.0.3112.113 Safari/537.36"
    }

    def get_page_html(self, uri=None):
        res = requests.get(uri, headers=self.headers)
        return lxml.html.fromstring(res.text)
