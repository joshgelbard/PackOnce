from django.db import models

# Create your models here.
class Trip(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=250, blank=True, default='')
    status  = models.CharField(max_length=20, default="active")
    date_range = models.CharField(max_length=100)

    class Meta:
        ordering = ('created',)
