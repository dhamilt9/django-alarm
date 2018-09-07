from alarmstatus.models import Alarm, AlarmRequests
from django.core import serializers
import sys, json

class RingAlarm():
	def __init__(self, name, reason, recaptcha):
		self.current_stat=Alarm.objects.get(pk=1)
		self.name=name
		self.reason=reason
		self.recaptcha=recaptcha
		self.response={};
	
	def do_work(self):
		if not self.recaptcha:
			self.response['success']=False
			self.response['error']="Nice try, robot"
		elif self.current_stat.status=="ON":
			self.current_stat.status="CON"
			self.current_stat.save()
			self.response['success']=True
			newRecord=AlarmRequests(action="wakeup", name=self.name, reason=self.reason)
			newRecord.save()
		else:
			self.response['success']=False
			if self.current_stat.status=="OFF":
				self.response['error']="Alarm is offline"
			elif self.current_stat.status=="CON":
				self.response['error']="Alarm is currently connecting to server"
			elif self.current_stat.status=="RIN":
				self.response['error']="Alarm is ringing"
			elif self.current_stat.status=="PRO":
				self.response['error']="Alarm is processing video"
			elif self.current_stat.status=="UP":
				self.response['error']="Alarm is uploading video"
			else:
				self.response['error']="Unknown error"
			
		self.response['alarm']={}
		self.response['alarm']['name']=self.current_stat.name
		self.response['alarm']['status']=self.current_stat.status
		self.response['alarm']['modified_at']=str(self.current_stat.modified_at)
		return self.response