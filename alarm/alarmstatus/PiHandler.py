from alarmstatus.models import Alarm, AlarmRequests
from videos.models import Video
from django.core import serializers
import sys, json, os, urllib
import urllib.request
from TwitterAPI import TwitterAPI
import urllib

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
		elif action=="social":
			latestVid=Video.objects.latest('time')
			
			videosrc = latestVid.src
			videoname = latestVid.name
			videoreason = latestVid.reason
			urllib.request.urlretrieve(videosrc, "video.mp4")
			
			twitter = TwitterAPI(os.environ['consumer_key'], os.environ['consumer_secret'], os.environ['access_token'], os.environ['access_secret'])
			VIDEO_FILENAME = 'video.mp4'
			bytes_sent = 0
			total_bytes = os.path.getsize(VIDEO_FILENAME)
			file = open(VIDEO_FILENAME, 'rb')
			r = twitter.request('media/upload', {'command':'INIT', 'media_type':'video/mp4', 'total_bytes':total_bytes})
			
			media_id = r.json()['media_id']
			segment_id = 0
			
			while bytes_sent < total_bytes:
				chunk = file.read(4*1024*1024)
				r = twitter.request('media/upload', {'command':'APPEND', 'media_id':media_id, 'segment_index':segment_id}, {'media':chunk})
				segment_id = segment_id + 1
				bytes_sent = file.tell()
				print('[' + str(total_bytes) + ']', str(bytes_sent))
				
			r = twitter.request('media/upload', {'command':'FINALIZE', 'media_id':media_id})
			r = twitter.request('statuses/update', {'status':'Woken by ' + videoname + '\nReason: ' + videoreason, 'media_ids':media_id})
			self.response['success']=True

		elif action=="done":
			if self.current_stat.status=="UP":
				self.current_stat.status="ON"
				self.current_stat.save()
				self.response['success']=True
			else:
				self.response['success']=False
				self.response['error']="Unavailable"
		
		return self.response