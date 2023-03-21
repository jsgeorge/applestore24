from django.contrib import admin
from .models import *
from django.utils.html import format_html
from mptt.admin import MPTTModelAdmin

# Register your models here.
admin.site.register(Category, MPTTModelAdmin)
admin.site.register(ProductRating)
admin.site.register(ProductReview)
class ProductSpecificationInline(admin.TabularInline):
    model = ProductSpecification

@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    inlines = [
        ProductSpecificationInline,
    ]

class ProductImageInline(admin.TabularInline):
    model = ProductImage

class ProductSpecificationValueInline(admin.TabularInline):
    model = ProductSpecificationValue

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [
        ProductSpecificationValueInline,
        ProductImageInline,
    ]
