from django.urls import path

from . import views


app_name = 'products'
urlpatterns = [
    path('', views.ProductsListView.as_view(), name='list'),
    path('basket/', views.BasketListView.as_view(), name='basket'),
    path('basket/add/', views.add_product_to_basket, name='add_product_to_basket'),
    path('basket/remove/<int:product_id>/', views.remove_product_from_basket, name='remove_product_from_basket'),
]
