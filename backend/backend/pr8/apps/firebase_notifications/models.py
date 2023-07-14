from django.db import models
from django.utils.translation import gettext_lazy as _


class NotificationToken(models.Model):
    """Модель для хранения токенов для PUSH-уведомлений"""

    token = models.TextField(
        unique=True,
        verbose_name=_('Токен'),
    )

    class Meta:
        verbose_name = _('Токен уведомления')
        verbose_name_plural = _('Токены уведомлений')

    def __str__(self) -> str:
        return self.token[:15]
