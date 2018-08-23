from videos.models import Video
from django.core import serializers
import sys, json

class VideoCreator():
	def __init__(self, name, reason, src):
		self.response={}
	
	def save(self, name, reason, src):
		newVid=Video(name=name, reason=reason, src=src)
		newVid.save()
		self.response['success']=True
		return self.response