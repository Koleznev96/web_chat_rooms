import aiohttp
import requests
from enum import Enum
from typing import Any
from dataclasses import dataclass


class FirebaseNotifier:
    """Класс для рассылки уведомлений в Firebase"""

    class Priority(str, Enum):
        """Приоритеты отправки уведомлений"""

        HIGH = 'high'
        NORMAL = 'normal'

    class Endpoints(str, Enum):
        """URL-адреса эндпоинтов API"""

        #SEND_NOTIFICATION = '/v1/projects/{project_id}/messages:send'
        SEND_NOTIFICATION = '/fcm/send'

    @dataclass
    class Message:
        """Класс сообщения"""

        body: str

    def __init__(self, base_url: str, api_key: str, project_id: str) -> None:
        """
        Инициализатор класса.

        :param base_url: Базовый URL-адрес Firebase сервиса.
        :param api_key: Секретный ключ для идентификации приложения.
        :param project_id: ID проекта в Firebase.
        """

        self.__base_url = base_url
        self.__api_key = api_key
        self.__project_id = project_id

    def send(
        self, 
        registration_ids: list[str], 
        priority: Priority,
        message: Message,
        headers: dict[str, str] | None = None,
    ) -> requests.Response:
        """
        Отправка уведомления указанным клиентам.

        :param registration_ids: Список токенов клиентов.
        :param priority: Приоритет запроса.
        :param body: Тело уведомления.
        :param headers: Дополнительные заголовки.
        """

        # Создаем все необходимые заголовки.
        sending_headers = self._get_headers_for_sending()
        if headers is not None:
            sending_headers.update(headers)

        response = requests.post(
            url=self.__get_full_url(self.Endpoints.SEND_NOTIFICATION),
            headers=sending_headers,
            json={
                'registrations_ids': registration_ids,
                'priority': priority,
                'notification': message.__dict__,
            },
        )

        return response
    
    async def asend(
        self, 
        registration_ids: list[str], 
        priority: Priority,
        message: Message,
        headers: dict[str, str] | None = None,
    ) -> aiohttp.ClientResponse:
        """
        Асинхронная отправка уведомления указанным клиентам.

        :param registration_ids: Список токенов клиентов.
        :param priority: Приоритет запроса.
        :param body: Тело уведомления.
        :param headers: Дополнительные заголовки.

        :return: Объект ответа ClientResponse.
        """

        # Создаем все необходимые заголовки.
        sending_headers = self._get_headers_for_sending()
        if headers is not None:
            sending_headers.update(headers)

        # Асинхронно создаем сессию для запросов.
        async with aiohttp.ClientSession(headers=sending_headers) as session:
            # Делаем асинхронный запрос на рассылку уведомлений.
            async with session.post(
                url=self.__get_full_url(self.Endpoints.SEND_NOTIFICATION),
                json={
                    'registration_ids': registration_ids,
                    'priority': priority,
                    'notification': message.__dict__,
                },
            ) as response:
                return response

    def _get_headers_for_sending(self) -> dict[str, str]:
        """
        Получение заголовков для отправки уведомления.

        :return: Словарь с заголовками для отправки уведомления.
        """

        return {
            'Content-Type': 'application/json',
            'Authorization': f'key={self.__api_key}',
        }

    def __get_full_url(self, endpoint_path: str) -> str:
        """
        Получение полного URL для запроса.

        :param endpoint_path: Путь требуемого эндпоинта.

        :return: Полный URL-адрес для запроса на указанный экндпоинт.
        """

        # Убираем лишние слешы, если они есть.
        if endpoint_path.startswith('/'):
            endpoint_path = endpoint_path[1:]
        
        base_url = self.__base_url
        if base_url.endswith('/'):
            base_url = base_url[:-1]

        return base_url + '/' + endpoint_path
