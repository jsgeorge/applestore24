from django.urls import path
from . import views

app_name="store"

urlpatterns =[
    path("products/", views.ProductListView.as_view(), name="store_home"),
    path("products/<slug:slug>/", views.ProductDetailView.as_view(), name="prod_detail"),
    path("products/<str:pk>/rate/", views.rate_Product, name="rate_product"),
    path("products/<str:pk>/review/", views.review_Product, name="review_product"),
    path("products/<str:pk>/reviews/", views.view_reviews, name="reviews_product"),
    path("products/latest/list/", views.ProductLatestListView.as_view(), name="store_latest"),
     path("products/featured1/list/", views.ProductFeatured1ListView.as_view(), name="store_featured_1"),
    path("products/featured2/list/", views.ProductFeatured2ListView.as_view(), name="store_featured_2"),
    path("products/toprated/list/", views.ProductTopRatedListView.as_view(), name="store_toprated"),
    path("productimages/list/", views.ProductImageListView.as_view(), name="store_home"),
    path("categories/list/", views.CategoryListView.as_view(), name="product_categories"),
    path("categories/<slug:slug>/", views.CategoryDetailView.as_view(), name="prod_detail"),
    path("products/categoryproducts/<slug:slug>/", views.CategoryProductsView.as_view(), name="category_view"),
    path("prodtypes/list", views.ProductTypeListView.as_view(), name="product_type"),

]