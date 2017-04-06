from rest_framework import serializers
from trip_items.models import TripItem

class TripItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripItem
        fields = ('id', 'name', 'status', 'category', 'trip')

    def create(self, validated_data):
        return TripItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.status = validated_data.get('status', instance.status)
        instance.category = validated_data.get('category', instance.category)
        instance.trip = validated_data.get('trip', instance.trip)
        instance.save()
        return instance
