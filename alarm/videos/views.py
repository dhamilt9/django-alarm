from videos.models import Video
from videos.serializers import VideoSerializer
from rest_framework import generics

class VideoListCreate(generics.ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer