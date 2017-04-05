from rest_framework import serializers
from items.models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'suggested_category', 'picture')

    def create(self, validated_data):
        return Item.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.suggested_category = validated_data.get('suggested_category', instance.suggested_category)
        instance.picture = validated_data.get('picture', instance.picture)
        instance.save()
        return instance
