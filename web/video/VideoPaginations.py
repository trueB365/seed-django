from rest_framework.pagination import PageNumberPagination


class VideoCursorPagination(PageNumberPagination):
    page_size = 50
    max_page_size = 100
    ordering = 'video_update'
    page_size_query_param = 'page_size'
    page_query_param = 'page'
