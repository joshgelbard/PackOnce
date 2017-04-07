from django.db import models

# Create your models here.

class Tagging(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    item = models.CharField(max_length=250, blank=True)
    activity = models.CharField(max_length=250, blank=True)
    category = models.CharField(max_length=250, default='other')
    count = models.IntegerField(default=1)
