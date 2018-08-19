from django.db import models

class Status(models.Model):
    status_id = models.PositiveSmallIntegerField()
    modified = models.DateTimeField(auto_now=True)

class History(models.Model):
    action=models.CharField(max_length=100)
    time=models.DateTimeField(auto_now_add=True)
    source=models.CharField(max_length=100)

class StatusLookup(models.Model):
	status_id = models.PositiveSmallIntegerField()
	status_desc = models.CharField(max_length=100)