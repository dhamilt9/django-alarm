from django.db import models

class Video(models.Model):
	name=models.CharField(max_length=100)
	reason=models.CharField(max_length=300)
	time=models.DateTimeField(auto_now_add=True)
	src=models.CharField(max_length=100)