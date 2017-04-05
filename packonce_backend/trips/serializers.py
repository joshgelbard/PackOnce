from rest_framework import serializers
from trips.models import Trip

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ('id', 'name', 'status', 'date_range')
    def create(self, validated_data):
        return Trips.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.status = validated_data.get('status', instance.status)
        instance.date_range = validated_data.get('data_range', instance.data_range)
        instance.save()
        return instance
