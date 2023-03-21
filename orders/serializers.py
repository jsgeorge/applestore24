from rest_framework import serializers
from .models import *
from store.serializers import ProductSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class OrderShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderShipping
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    shipping_address = OrderShippingSerializer(many=False)
    class Meta:
        model = Order
        fields = ['id','user','order_date', 'order_total',
         'pay_type', 'pay_ccno', 'pay_exp', 'shipping_address',
         'order_shipping', 'complete', 'deliverd']

class OrderDetailSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=False)
    class Meta:
        model = OrderDetail
        fields = ['id','product','qty', 'price', 'discount']
 
