from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class FirebaseNotificationsConfig(AppConfig):
    """Конфигурация приложения уведомлений через Firebase"""

    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.firebase_notifications'
    verbose_name = _('Firebase уведомления')
