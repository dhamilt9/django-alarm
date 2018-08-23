from alarmstatus.models import Alarm, AlarmRequests
from django.core import serializers
import sys, json

class RingAlarm():
	def __init__(self, name, reason):
		self.current_stat=Alarm.objects.get(pk=1)
		self.name=name
		self.reason=reason
		self.response={};
	
	def do_work(self):
		if self.current_stat.status=="ON":
			self.current_stat.status="CON"
			self.current_stat.save()
			self.response['success']=True
		else:
			self.response['success']=False
			self.response['error']="Unavailable"
		self.response['alarm']={}
		self.response['alarm']['name']=self.current_stat.name
		self.response['alarm']['status']=self.current_stat.status
		self.response['alarm']['modified_at']=str(self.current_stat.modified_at)
		newRecord=AlarmRequests(action="wakeup", name=self.name, reason=self.reason)
		newRecord.save()
		return self.response