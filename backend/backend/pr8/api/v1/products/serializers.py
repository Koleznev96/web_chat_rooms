from rest_framework import serializers

from apps.products import models


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    average_rate = serializers.FloatField(read_only=True)
    count_comments = serializers.IntegerField(read_only=True)
    absolute_url = serializers.CharField(
        source='get_absolute_url',
        read_only=True,
    )
    comments = CommentSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = models.Product
        fields = '__all__'
        extra_kwargs = {
            'categories': {'read_only': True},
        }
        depth = 1
