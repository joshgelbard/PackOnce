from rest_framework import serializers
from trips.models import Trips

class TripSerializer(serializers.Serializer)
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True, allow_blank=False max_length=100)
    status = serializers.CharField(required=True, max_length= 20)
    date_range = serializers.CharField(required=True, max_length=100);

    def create(self, validated_data):
        return Trips.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.status = validated_data.get('status', instance.status)
        instance.date_range = validated_data.get('data_range', instance.data_range)
        instance.save()
        return instance
