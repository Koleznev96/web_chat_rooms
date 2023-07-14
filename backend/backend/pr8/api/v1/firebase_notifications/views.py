from rest_framework.generics import CreateAPIView

from .serializers import NotificationTokenSerializer


class NotificationTokenCreateAPIView(CreateAPIView):
    """API для добавления токенов для PUSH-уведомлений"""

    serializer_class = NotificationTokenSerializer
