from django.urls import include, path
from . import views
urlpatterns = [
    path('video', views.VideoList.as_view() ),
    path('videocreate', views.VideoCreator.as_view() ),
]