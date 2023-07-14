from rest_framework.viewsets import ModelViewSet

from apps.chat.models import ChatRoom
from .serializers import ChatRoomSerializer


class ChatRoomViewSet(ModelViewSet):
    serializer_class = ChatRoomSerializer
    queryset = ChatRoom.objects.all()
