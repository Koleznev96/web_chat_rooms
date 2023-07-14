from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register(r'', views.ChatRoomViewSet, basename='chat')

app_name = 'api_chat'
urlpatterns = router.urls
