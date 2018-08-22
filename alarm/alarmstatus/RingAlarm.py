from alarmstatus.models import Status, History, StatusLookup
import sys

class RingAlarm():
	def __init__(self, name, reason):
		self.current_stat=Status.objects.get(pk=1)
		self.name=name
		self.reason=reason
		self.response={};
	
	def do_work(self):
		if self.current_stat.status_id==2:
			self.current_stat.status_id=4
			self.current_stat.data="Name: '{0}', Reason: '{1}'".format( self.name, self.reason )
			self.current_stat.save()
			self.response['error']="none"
		else:
			self.response['error']="unavailable"
	
		return self.response