from rest_framework import serializers
from alarmstatus.models import Alarm, AlarmRequests
class AlarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alarm
        fields = '__all__'
		
class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlarmRequests
        fields = '__all__'