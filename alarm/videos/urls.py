from django.urls import path
from . import views
urlpatterns = [
    path('video', views.VideoListCreate.as_view() ),
    path('videocreate', views.VideoCreator.as_view() ),
]