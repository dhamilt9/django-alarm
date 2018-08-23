from alarmstatus.models import Alarm, AlarmRequests
from alarmstatus.serializers import AlarmSerializer, RequestSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
 
from alarmstatus.RingAlarm import RingAlarm
from alarmstatus.ConnectAlarm import ConnectAlarm
from alarmstatus.PiHandler import PiHandler


class AlarmRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Alarm.objects.all()
    serializer_class = AlarmSerializer

class RequestsListCreate(generics.ListCreateAPIView):
    queryset = AlarmRequests.objects.all()
    serializer_class = RequestSerializer
	
class RingAlarmView(APIView):
	def post(self, request):
		name=request.data.get("name")
		reason=request.data.get("reason")
		alarm=RingAlarm(name=name, reason=reason)
		result=alarm.do_work()
		response = Response(json.dumps(result), status=status.HTTP_200_OK)
		return response
		
class PiUpdateView(APIView):
	def post(self, request):
		action=request.data.get("action")
		pi=PiHandler()
		result=pi.connect(action)
		response = Response(json.dumps(result), status=status.HTTP_200_OK)
		return response