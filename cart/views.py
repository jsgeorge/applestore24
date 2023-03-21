from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.http import require_POST
import json
from store.models import Product

from .cart import Cart


def cart_summary(request):
    cart = Cart(request)

    return JsonResponse({'cart': cart})


def cart_add(request):
    cart = Cart(request)

    data = json.loads(request.body)
    # username = data.get("username")
    # password = data.get("password")

    #if request.POST.get('action') == 'post':
    prodid = data.get('prodid')
    slug= data.et('slug')
    qty = data.get('qty')
    price = dd=ata.get('price')
    disount= data.get('discount')
    print(prodid, slug, qty)
    product = get_object_or_404(Product, id=prodid)
    cart.add(product=product, qty=qty, price=price,)

    cartqty = cart.__len__()
    if(cart):
        return JsonResponse({"Info":"Item added to card", 'qty': cartqty})
    else:
        return JsonResponse({"Err":"Could not add item to cart"})

def cart_delete(request):
    cart = Cart(request)
    if request.POST.get('action') == 'post':
        product_id = int(request.POST.get('productid'))
        cart.delete(product=product_id)

        cartqty = cart.__len__()
        carttotal = cart.get_tprintotal_price()
        response = JsonResponse({'qty': cartqty, 'subtotal': carttotal})
        return response


def cart_update(request):
    cart = Cart(request)
    if request.POST.get('action') == 'post':
        product_id = int(request.POST.get('productid'))
        product_qty = int(request.POST.get('productqty'))
        cart.update(product=product_id, qty=product_qty)

        cartqty = cart.__len__()
        carttotal = cart.get_total_price()
        response = JsonResponse({'qty': cartqty, 'subtotal': carttotal})
        return response
