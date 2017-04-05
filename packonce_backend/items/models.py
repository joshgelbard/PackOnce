from django.db import models

# Create your models here.
class Item(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=250, blank=True, default='')
    suggested_category = models.CharField(max_length=250, blank=True, default='')
    picture = models.CharField(max_length=500, blank=True, default='')

    class Meta:
        ordering = ('created',)
