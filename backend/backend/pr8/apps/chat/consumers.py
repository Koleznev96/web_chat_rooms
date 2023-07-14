from typing import Any
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from django.conf import settings

from .models import ChatRoom

from apps.firebase_notifications.models import NotificationToken
from apps.firebase_notifications.services.firebase_notifier import FirebaseNotifier


class ChatConsumer(AsyncJsonWebsocketConsumer):
    """Асинхронный обработчик WS-соединения для чатов"""

    async def connect(self) -> None:
        """Срабатывает при получении нового подключения"""

        # Берем имя комнаты из URL.
        self.__room_name = self.scope['url_route']['kwargs']['room_name']

        # Проверка, что запрашиваемая клиентом комната действительно существует в БД.
        if not await ChatRoom.objects.filter(name=self.__room_name).aexists():
            return await self.close()

        # Сохраним в экземпляре обработчика название группы на основе названия команты.
        self.__room_group_name = f'chat_{self.__room_name}'

        # Асинхронное добавление в группу текущего канала, который обрабатывает обработчик.
        await self.channel_layer.group_add(self.__room_group_name, self.channel_name)

        # Принимаем соединение. 
        await self.accept()

        # Отправка сообщения во все каналы, находящиеся в группе уведомлений.
        await self.channel_layer.group_send(
            NotificationsConsumer.__name__,
            {
                'type': 'send_notification',
                'message': (
                    f'Новое подключение к {self.__room_name}: '
                    f'{self.scope["client"][0]}:{self.scope["client"][1]}'
                ),
            },
        )

        # Отправка уведомлений через сервис Firebase.
        registrations_ids: list[str] = await sync_to_async(list)(
            NotificationToken.objects.values_list('token', flat='True')
        )
        message = FirebaseNotifier.Message(body=(
                f'Новое подключение к {self.__room_name} (Firebase): '
                f'{self.scope["client"][0]}:{self.scope["client"][1]}'
            )
        )
        firebase_notifier = FirebaseNotifier(
            base_url=settings.FCM_BASE_URL,
            api_key=settings.FCM_API_KEY,
            project_id=settings.FCM_PROJECT_ID,
        )
        await firebase_notifier.asend(
            registration_ids=registrations_ids,
            priority=FirebaseNotifier.Priority.HIGH,
            message=message,
        )

    async def disconnect(self, close_code: int) -> None:
        """Срабатывает при закрытии канала"""
        
        await self.channel_layer.group_discard(self.__room_group_name, self.channel_name)

    async def receive_json(self, content: dict[str, Any], **kwargs) -> None:
        """Срабатывает при получении данных в сокет с клиента"""

        username: str = content['username']
        message: str = content['message']

        # Отправляем данные во всех потребители, которые находятся в той же группе. 
        # Это работает через брокер сообщений. В нашем случае, через Redis. 
        await self.channel_layer.group_send(
            self.__room_group_name, 
            {
                'type': 'chat_message', 
                'username': username,
                'message': message,
            },
        )

    async def chat_message(self, event: dict[str, Any]) -> None:
        """Метод отправки данных на клиент"""

        username: str = event['username']
        message: str = event['message']

        await self.send_json(
            content={
                'username': username,
                'message': message,
            },
        )


class NotificationsConsumer(AsyncJsonWebsocketConsumer):
    """Асинхронный обработчик уведомлений"""

    async def connect(self) -> None:
        """Обработка нового подключения"""

        # Добавим текущий канал в группу для рассылки уведомлений.
        await self.channel_layer.group_add(self.__class__.__name__, self.channel_name)

        return await super().connect()
    
    async def send_notification(self, event: dict[str, Any]) -> None:
        """Отправка уведомления клиенту в канале"""

        message: str = event['message']

        await self.send_json(
            content={
                'message': message,
            },
        )
