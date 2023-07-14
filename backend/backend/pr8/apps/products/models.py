from django.db import models
from django.urls import reverse
from django.core.validators import (
    MinValueValidator, 
    MaxValueValidator,
)
from django.utils.translation import gettext_lazy as _


class Product(models.Model):
    
    name = models.CharField(
        max_length=64,
        verbose_name=_('Название'),
    )
    short_desc = models.TextField(
        verbose_name=_('Краткое описание'),
    )
    description = models.TextField(
        verbose_name=_('Описание'),
    )
    image = models.ImageField(
        upload_to='products',
        verbose_name=_('Изображение'),
    )
    price = models.DecimalField(
        max_digits=14,
        decimal_places=5,
        verbose_name=_('Цена'),
    )
    categories = models.ManyToManyField(
        to='Category',
        related_name='products',
        related_query_name='product',
        verbose_name=_('Категории'),
    )

    class Meta:
        verbose_name = _('Продукт')
        verbose_name_plural = _('Продукты')

    def get_absolute_url(self) -> str:
        # TODO: Добавить вьюшку для одного продукта.
        #return reverse('products:detail', args=('pk', ))
        return '#'

    def __str__(self) -> str:
        return self.name


class Category(models.Model):

    name = models.CharField(
        max_length=64,
        verbose_name=_('Название'),
    )

    class Meta:
        verbose_name = _('Категория')
        verbose_name_plural = _('Категории')

    def __str__(self) -> str:
        return self.name


class Comment(models.Model):

    user_name = models.CharField(
        max_length=150,
        verbose_name=_('Имя пользователя'),
    )
    text = models.TextField(
        verbose_name=_('Текст'),
    )
    rate = models.SmallIntegerField(
        validators=(MinValueValidator(1), MaxValueValidator(5)),
        default=5,
        verbose_name=_('Оценка'),
    )
    product = models.ForeignKey(
        to=Product,
        on_delete=models.CASCADE,
        related_name='comments',
        related_query_name='comment',
        verbose_name=_('Продукт'),
    )

    class Meta:
        verbose_name = _('Комментарий')
        verbose_name_plural = _('Комментарии')

    def __str__(self) -> str:
        return f'{self.product}#{self.text[:20]}'
