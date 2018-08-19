from alarmstatus.models import Status, History, StatusLookup
from alarmstatus.serializers import StatusSerializer, HistorySerializer, StatusLookupSerializer
from rest_framework import generics

class StatusRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer

class HistoryListCreate(generics.ListCreateAPIView):
    queryset = History.objects.all()
    serializer_class = HistorySerializer

class StatusLookupRetrieve(generics.ListCreateAPIView):
    queryset = StatusLookup.objects.all()
    serializer_class = StatusLookupSerializer