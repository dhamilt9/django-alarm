from alarmstatus.models import Alarm, AlarmRequests
from alarmstatus.serializers import AlarmSerializer, RequestSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from django.utils.decorators import method_decorator
from django.http import JsonResponse
import json
from django.views import View
from alarmstatus.RingAlarm import RingAlarm
from alarmstatus.PiHandler import PiHandler

class AlarmRetrieve(generics.RetrieveAPIView):
    authentication_classes = ()
    permission_classes = ()
    queryset = Alarm.objects.all()
    serializer_class = AlarmSerializer

class RequestsListCreate(generics.ListCreateAPIView):
    queryset = AlarmRequests.objects.all()
    serializer_class = RequestSerializer
    
class RingAlarmView(View):
    @method_decorator(authentication_classes([]))
    @method_decorator(permission_classes([]))
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
        
    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        name=body_data['name']
        reason=body_data['name']
        alarm=RingAlarm(name=name, reason=reason)
        result=alarm.do_work()
        response = JsonResponse(result)
        return response
        
class PiUpdateView(APIView):
    def post(self, request):
        action=request.data.get("action")
        pi=PiHandler()
        result=pi.connect(action)
        response = Response(json.dumps(result), status=status.HTTP_200_OK)
        return response