from django.db import models
from django.utils.translation import gettext_lazy as _


class ChatRoom(models.Model):
    """Модель комнаты чата"""

    name = models.CharField(
        max_length=150,
        verbose_name=_('Название'),
    )

    class Meta:
        verbose_name = _('Команта чата')
        verbose_name_plural = _('Комнаты чатов')

    def __str__(self) -> str:
        return self.name
