from django.contrib import admin


from . import models


admin.site.register(models.Category)


class CommentInline(admin.StackedInline):
    model = models.Comment
    extra = 0


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price')
    list_display_links = ('name', 'price')
    inlines = (
        CommentInline,
    )
