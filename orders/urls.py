from django.urls import path
from . import views

app_name="order"

urlpatterns =[
    # path('', views.OrderListView.as_view(), name='cart_summary'),
    path("user/", views.list, name="order_list"),
    path("view/<str:pk>/", views.view, name="order_view"),
    path("shipping/<str:pk>/",views.shipping, name="order_shipping"),
    path("details/<str:pk>/", views.details, name="details_list"),
    path('add/', views.order_add, name='order_add'),
    # path('delete/', views.cart_delete, name='cart_delete'),
    # path('update/', views.cart_update, name='cart_update'),
]