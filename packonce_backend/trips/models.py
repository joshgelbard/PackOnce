from django.db import models

# Create your models here.
class Trip(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=250, default='')
    status  = models.CharField(max_length=50, default="false")
    date_range = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ('created',)
