from django.db import models

# Create your models here.
class Item(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=250)
    suggested_category = models.CharField(max_length=250)
    status = models.CharField(max_length=50, default='False')

    class Meta:
        ordering = ('created',)
