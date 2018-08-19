from rest_framework import serializers
from alarmstatus.models import Status, History, StatusLookup
class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'
		
class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = '__all__'
		
class StatusLookupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusLookup
        fields = '__all__'