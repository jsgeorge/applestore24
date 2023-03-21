from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from store.models import Product, Category
from store.serializers import *

User = settings.AUTH_USER_MODEL


# Create your models here.
class OrderShipping(models.Model):
      #order = models.ForeignKey(Order, null=True, on_delete=models.SET_NULL)
      firstname = models.CharField(default="", max_length=200)
      lastname = models.CharField(default="",max_length=200)
      address = models.CharField(max_length=200)
      address2 = models.CharField(max_length=200, null=True, blank=True, default='')
      city = models.CharField(max_length=200)
      state = models.CharField(max_length=200)
      zip = models.CharField(max_length=200)
      country = models.CharField(max_length=200)

      def __str__(self):
        return self.address

class Order(models.Model):
     user =  models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
     order_date = models.DateTimeField(auto_now_add=True)
     shipping_address = models.ForeignKey(OrderShipping, null=True, on_delete=models.SET_NULL)
     pay_type = models.CharField(max_length=30, default='')
     pay_ccno = models.CharField(max_length=16,  default='', null=True, blank=True)
     pay_exp = models.CharField(max_length=20, default='',null=True, blank=True)
     order_shipping = models.DecimalField(default=0.00, max_digits=6, decimal_places=2)
     order_total = models.DecimalField(default=0.00, max_digits=6, decimal_places=2)
     complete = models.BooleanField(default=False)
     deliverd = models.BooleanField(default=False)
     
     def __int__(self):
        return self.id
     
class OrderDetail(models.Model):
     order = models.ForeignKey(Order, null=True, on_delete=models.SET_NULL)
     product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)
     qty=models.IntegerField()
     price =models.DecimalField(default=0.00, max_digits=6, decimal_places=2)
     discount = models.DecimalField(default=0.00, max_digits=6, decimal_places=2)
     order_date = models.DateTimeField(auto_now_add=True)

     
    
