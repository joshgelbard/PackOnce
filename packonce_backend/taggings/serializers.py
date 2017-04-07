from rest_framework import serializers
from taggings.models import Tagging

class TaggingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tagging
        fields = ('id', 'item', 'activity', 'count')

    def create(self, validated_data):
        return Tagging.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.item = validated_data.get('item', instance.item)
        instance.activity = validated_data.get('activity', instance.activity)
        instance.count = validated_data.get('count', instance.count)
        return instance
