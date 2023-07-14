from django.db.models import (
    Avg,
    Count,
    QuerySet,
)

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from . import serializers
from apps.products import models


class ProductViewSet(ModelViewSet):
    serializer_class = serializers.ProductSerializer

    def get_queryset(self) -> QuerySet[models.Product]:
        return models.Product.objects \
            .prefetch_related('comments', 'categories') \
            .annotate(
                average_rate=Avg('comment__rate'), 
                count_comments=Count('comment'),
            )

    def head(self, request: Request, *args, **kwargs) -> Response:
        response = self.retrieve(request, *args, **kwargs)
        response.data = ''
        return response
    

class CommentViewSet(ModelViewSet):
    serializer_class = serializers.CommentSerializer
    queryset = models.Comment.objects.all()


class CategoryViewSet(ModelViewSet):
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()
