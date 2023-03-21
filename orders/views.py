from django.shortcuts import render
from store.models import Product
from .models import Order, OrderDetail, OrderShipping
from .serializers import OrderSerializer, OrderDetailSerializer, OrderShippingSerializer
import json
from django.contrib.auth.models import User
from rest_framework import generics,viewsets,status, serializers, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny


# Create your views here.

# class OrderListView(generics.ListAPIView):
#     queryset = Order.objects.filter(ordered=False)
#     serializer_class = OrderSerializer


# class OrderListView(viewsets.ModelViewSet):
#     queryset = Order.objects.order_by('order_date').reverse()
#     serializer_class = OrderSerializer
#     permission_classes = (AllowAny,)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def order_add(request):
    
    user = request.user
    data = request.data
   
    orderItems = data['cartItems']
    ordShipping =  data['ordShipping']
    ordPayment = data['ordPayment']
    ccno = '';
    exp = '';
    delCost = data['delCost']
    ordTotal = data['ordTotal']
    order = ''

    # if (ordPayment['payType'] == 'Paypal'):    
    order = Order.objects.create(
            user=user,
            pay_type = ordPayment['payType'],
            order_shipping=delCost,
            order_total=ordTotal,
            complete=True
    )
    # else :  
    #     order = Order.objects.create(
    #             user=user,
    #             pay_type = ordPayment['payType'],
    #             pay_ccno = ordPayment['payCCNO'],
    #             pay_exp = ordPayment['payEXP'],
    #             order_shipping=delCost,
    #             order_total=ordTotal,
    #             complete=True
    #     )

    serializer = OrderSerializer(order,many=False)
    
    for item in orderItems :
        product = Product.objects.get(id=item['product'])
        orderdetail = OrderDetail.objects.create(
            order =  order,
            product = product,
            qty= item['qty'],
            price = item['price'],
            discount = item['discount']
        
        )
        product.inv_qty= product.inv_qty - item['qty']
        product.sold_qty = product.sold_qty + item['qty']
        product.save()
    
    ordership = OrderShipping.objects.create(
            order = order,
            firstname =ordShipping['firstname'],
            lastname =ordShipping['lastname'],
            address =ordShipping['address'],
            address2 =ordShipping['address2'],
            city = ordShipping['city'],
            state  = ordShipping['region'],
            zip  = ordShipping['postalcode'],
            country =ordShipping['country']
    )
    order.shipping_address = ordership
    order.save()

    #serializership= OrderShippingSerializer(ordership,many=False)
    
    response ={'result': serializer.data}

    return Response(response, status=status.HTTP_200_OK)
    
    #return Response('add order')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list(request):
    queryset = Order.objects.filter(user=request.user).order_by('order_date').reverse()
    serializer_class = OrderSerializer(queryset,many=True)
    response=serializer_class.data
    return Response(response, status=status.HTTP_200_OK)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def view(request, pk):
    queryset = Order.objects.get(id=pk)
    serializer_class = OrderSerializer(queryset,many=False)
    response=serializer_class.data
    print(response)
    return Response(response, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def shipping(request, pk):
    queryset = OrderShipping.objects.get(id=pk)
    serializer_class = OrderShippingSerializer(queryset,many=False)
    response=serializer_class.data
    print(response)
    return Response(response, status=status.HTTP_200_OK)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def details(request, pk):
    queryset = OrderDetail.objects.filter(order=pk)
    serializer_class = OrderDetailSerializer(queryset,many=True)
    response=serializer_class.data
    return Response(response, status=status.HTTP_200_OK)
   
