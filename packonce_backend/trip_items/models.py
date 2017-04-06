from django.db import models
from trips import models as trip_models

# Create your models here.
class TripItem(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=250)
    category = models.CharField(max_length=250)
    status = models.CharField(max_length=50, default='False')
    trip = models.ForeignKey(trip_models.Trip)

    class Meta:
        ordering = ('created',)
