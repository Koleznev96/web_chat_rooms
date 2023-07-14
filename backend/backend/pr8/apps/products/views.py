from typing import (
    Any,
    Final,
)
from enum import Enum
from decimal import Decimal

from django.http import (
    HttpRequest,
    HttpResponse,
    JsonResponse,
)
from django.db.models import (
    Avg,
    Sum,
    Count,
    QuerySet,
)
from django.shortcuts import redirect
from django.views.generic.list import ListView
from django.views.decorators.cache import never_cache

from .models import Product


class SessionKeys(Enum):
    """Ключи сессии, используемые в текущих обработчиках"""

    PRODUCTS_IDS = 'products_ids'


class ProductsListView(ListView):
    """Обработчик для списка продуктов"""

    http_method_names = ('get', )
    template_name = 'products/list.html'
    context_object_name = 'products'

    def get_queryset(self) -> QuerySet[Product]:
        return Product.objects \
            .prefetch_related('comments', 'categories') \
            .annotate(
                average_rate=Avg('comment__rate'), 
                count_comments=Count('comment'),
            )


def add_product_to_basket(request: HttpRequest) -> JsonResponse:
    """Добавление продукта в корзину через AJAX"""

    if request.method != 'POST':
        return JsonResponse(
            data={
                'detail': 'Метод не подерживается.',
                'allow_methods': ['POST'],
            },
            status=405,
        )

    EXPECTED_PARAM: Final[str] = 'product_id'

    product_id: int | None = request.POST.get(EXPECTED_PARAM)

    if product_id is None:
        return JsonResponse(
            data={'detail': f'Поле {EXPECTED_PARAM} является обязательным.'},
            status=400,
        )
    product_id = int(product_id)
    
    if request.session.get(SessionKeys.PRODUCTS_IDS.value) is None:
        request.session[SessionKeys.PRODUCTS_IDS.value] = []

    if product_id not in request.session[SessionKeys.PRODUCTS_IDS.value]:
        request.session[SessionKeys.PRODUCTS_IDS.value].append(product_id)

    return JsonResponse(
        data={EXPECTED_PARAM: product_id},
        status=200,
    )


@never_cache
def remove_product_from_basket(request: HttpRequest, product_id: int) -> HttpResponse:
    """Удаление продукта из корзины"""

    if request.session.get(SessionKeys.PRODUCTS_IDS.value) is None:
        request.session[SessionKeys.PRODUCTS_IDS.value] = []

    if product_id in request.session[SessionKeys.PRODUCTS_IDS.value]:
        request.session[SessionKeys.PRODUCTS_IDS.value].remove(product_id)

    return redirect('products:basket')


class BasketListView(ListView):
    """Обработчик для корзины"""

    http_method_names = ('get', )
    template_name = 'products/basket.html'
    context_object_name = 'products'

    def get_queryset(self) -> QuerySet[Product]:
        """Получение продуктов из сессии"""

        products_ids: list[int] = self.request.session.get(SessionKeys.PRODUCTS_IDS.value, [])

        return Product.objects \
            .filter(pk__in=products_ids) \
            .prefetch_related('comments', 'categories') \
            .annotate(
                average_rate=Avg('comment__rate'), 
                count_comments=Count('comment')
            )

    def get_context_data(self, **kwargs: Any) -> dict[str, Any]:
        """Получение контекста с данными для шаблона"""

        context = super().get_context_data(**kwargs)

        products: QuerySet[Product] = context[self.context_object_name]
        total_cost: Decimal = products.aggregate(total_cost=Sum('price'))['total_cost']
        context['total_cost'] = total_cost or 0

        return context
