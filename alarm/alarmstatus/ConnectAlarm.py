from alarmstatus.models import Alarm, AlarmRequests
from django.core import serializers
import sys, json

class ConnectAlarm():
	def __init__(self):
		self.current_stat=Alarm.objects.get(pk=1)
		self.response={};
	
	def do_work(self):
		if self.current_stat.status=="CON":
			self.current_stat.status="RIN"
			self.current_stat.save()
			self.response['success']=True
		else:
			self.response['success']=False
			self.response['error']="Unavailable"
		self.response['alarm']={}
		self.response['alarm']['name']=self.current_stat.name
		self.response['alarm']['status']=self.current_stat.status
		self.response['alarm']['modified_at']=str(self.current_stat.modified_at)
		latestRecord=AlarmRequests.objects.latest('created_at')
		self.response['record']={}
		self.response['record']['name']=latestRecord.name
		self.response['record']['reason']=latestRecord.reason
		
		
		return self.response