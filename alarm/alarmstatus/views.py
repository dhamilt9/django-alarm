from alarmstatus.models import Status, History, StatusLookup
from alarmstatus.serializers import StatusSerializer, HistorySerializer, StatusLookupSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from alarmstatus.RingAlarm import RingAlarm


class StatusRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer

class HistoryListCreate(generics.ListCreateAPIView):
    queryset = History.objects.all()
    serializer_class = HistorySerializer

class StatusLookupRetrieve(generics.ListCreateAPIView):
    queryset = StatusLookup.objects.all()
    serializer_class = StatusLookupSerializer
	
class RingAlarmView(APIView):
	def post(self, request):
		name=request.data.get("name")
		reason=request.data.get("reason")
		myClass=RingAlarm(name=name, reason=reason)
		result=myClass.do_work()
		response = Response(result, status=status.HTTP_200_OK)
		return response

