from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register(r'comments', views.CommentViewSet, basename='comments')
router.register(r'categories', views.CategoryViewSet, basename='categories')
router.register(r'', views.ProductViewSet, basename='products')

app_name='products_api'
urlpatterns = router.urls
