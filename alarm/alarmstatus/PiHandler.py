from alarmstatus.models import Alarm, AlarmRequests
from django.core import serializers
import sys, json

class PiHandler():
	def __init__(self):
		self.current_stat=Alarm.objects.get(pk=1)
		self.response={}
	
	def connect(self, action):
		if action=="connect":
			if self.current_stat.status=="CON":
				self.current_stat.status="RIN"
				self.current_stat.save()
				self.response['success']=True
				latestRecord=AlarmRequests.objects.latest('created_at')
				self.response['record']={}
				self.response['record']['name']=latestRecord.name
				self.response['record']['reason']=latestRecord.reason
			else:
				self.response['success']=False
				self.response['error']="Unavailable"
		elif action=="process":
			if self.current_stat.status=="RIN":
				self.current_stat.status="PRO"
				self.current_stat.save()
				self.response['success']=True
			else:
				self.response['success']=False
				self.response['error']="Unavailable"
		elif action=="upload":
			if self.current_stat.status=="PRO":
				self.current_stat.status="UP"
				self.current_stat.save()
				self.response['success']=True
			else:
				self.response['success']=False
				self.response['error']="Unavailable"
		elif action=="done":
			if self.current_stat.status=="UP":
				self.current_stat.status="ON"
				self.current_stat.save()
				self.response['success']=True
			else:
				self.response['success']=False
				self.response['error']="Unavailable"
		
		return self.response