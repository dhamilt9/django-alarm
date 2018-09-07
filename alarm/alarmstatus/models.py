from django.db import models

class Alarm(models.Model):
	CHOICES = (
		('OFF', 'Offline'),
		('CON', 'Connecting'),
		('ON', 'Online'),
		('RIN', 'Ringing'),
		('PRO', 'Processing'),
		('UP', 'Uploading'),
	)
	name = models.CharField(max_length=256)
	status = models.CharField(max_length=100, choices=CHOICES)
	modified_at = models.DateTimeField(auto_now=True)

class AlarmRequests(models.Model):
	action=models.CharField(max_length=100)
	created_at=models.DateTimeField(auto_now_add=True)
	name=models.CharField(max_length=256)
	reason=models.CharField(max_length=1000)