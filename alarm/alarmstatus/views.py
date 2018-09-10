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
import urllib
from django.views import View
from alarmstatus.RingAlarm import RingAlarm
from alarmstatus.PiHandler import PiHandler
from django.views.decorators.csrf import csrf_exempt
import os

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
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
        
    def post(self, request):
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        name=body_data['name']
        reason=body_data['reason']
        recaptcha_response=body_data['recaptchaValue']
        
        url = 'https://www.google.com/recaptcha/api/siteverify'
        values = {
            'secret': os.environ.get('RECAPTCHA'),
            'response': recaptcha_response
        }
        data = urllib.parse.urlencode(values).encode()
        req =  urllib.request.Request(url, data=data)
        response = urllib.request.urlopen(req)
        recaptcharesult = json.loads(response.read().decode())
        bot=recaptcharesult['success']
        alarm=RingAlarm(name=name, reason=reason, recaptcha=bot)
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