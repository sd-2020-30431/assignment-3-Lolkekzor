from rest_framework import serializers
from .models import List, ListItem


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['id', 'name']

    def create(self, validated_data):
        return List.objects.create(**validated_data)


class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = ['id', 'name', 'quantity', 'calories', 'purchase_date', 'expiration_date', 'consumption_date']

    def create(self, validated_data):
        return ListItem.objects.create(**validated_data)
