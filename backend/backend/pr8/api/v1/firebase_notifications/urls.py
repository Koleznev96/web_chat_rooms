from django.urls import path

from . import views


app_name = 'api_firebase_notifications'
urlpatterns = [
    path('tokens/', views.NotificationTokenCreateAPIView.as_view(), name='add_token'),
]
