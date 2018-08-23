from videos.models import Video
from videos.serializers import VideoSerializer
from rest_framework import generics
from rest_framework.views import APIView

from videos.VideoCreator import VideoCreator

class VideoListCreate(generics.ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
	
class VideoCreator(APIView):
	def post(self, request):
		name=request.data.get("name")
		reason=request.data.get("reason")
		src=request.data.get("src")
		newVid=VideoCreator()
		result=newVid.save(name=name, reason=reason, src=src)
		response = Response(json.dumps(result), status=status.HTTP_200_OK)
		return response