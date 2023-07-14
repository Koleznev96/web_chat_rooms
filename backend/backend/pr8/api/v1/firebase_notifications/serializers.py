from rest_framework import serializers

from apps.firebase_notifications.models import NotificationToken


class NotificationTokenSerializer(serializers.ModelSerializer):
    """Сериализатор для Firebase-токенов уведомлений"""

    class Meta:
        model = NotificationToken
        fields = '__all__'
