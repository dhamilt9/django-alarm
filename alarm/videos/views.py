from videos.models import Video
from videos.serializers import VideoSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json

class VideoList(generics.ListAPIView):
    authentication_classes = ()
    permission_classes = ()
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
	
class VideoCreator(APIView):
	def post(self, request):
		name=request.data.get("name")
		reason=request.data.get("reason")
		src=request.data.get("src")
		newVid=Video(name=name, reason=reason, src=src)
		newVid.save()
		response = Response(status=status.HTTP_200_OK)
		return response