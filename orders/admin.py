from django.contrib import admin
from .models import *
from mptt.admin import MPTTModelAdmin

# Register your models here.
class OrderShippingAdmin(admin.ModelAdmin):
    list_display = (
        # 'order',
        'lastname',
        'firstname',
        'address',
        'city',
        'state',
        'zip',
    )

admin.site.register(OrderShipping,OrderShippingAdmin)

# class OrderShippingInline(admin.TabularInline):
#     model = OrderShipping



class OrderDetailAdmin(admin.ModelAdmin):
    list_display = (
        'order',
        'product',
        'qty',
        'price',
        'discount',
    )

admin.site.register(OrderDetail,OrderDetailAdmin)

# class OrderDetailsInline(admin.TabularInline):
#     model = OrderDetail

class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'order_date',
        'user',
        'complete',
        'deliverd',
    )

admin.site.register(Order,OrderAdmin)
# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):
#     inlines = [
#         OrderShippingInline,
#         OrderDetailsInline,
#     ]
