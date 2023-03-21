from rest_framework import serializers
from .models import *
from users.serializers import UserSerializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "slug", "parent","menu_order"]

class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = ["name"]

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", 'image']

class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRating
        fields = ['id', 'user', 'product', 'rating']

class ProductSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecification
        fields = ['id', 'product_type', 'name']

class ProductSpecificationValueSerializer(serializers.ModelSerializer):
    specification = ProductSpecificationSerializer(many=False)
    class Meta:
        model = ProductSpecificationValue
        fields = ['id', 'specification', 'value']

class ProductReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)
    class Meta:
        model = ProductReview
        fields = ['id', 'product', 'user', 'name', 'content', 'timestamp']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(many=False)
    product_image = ProductImageSerializer(many=True, read_only=True)
    reviews = ProductReviewSerializer(many=True)
    product_spec = ProductSpecificationValueSerializer(many=True)
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "category", "headline",
         "description", "regular_price","discount_price","product_image",
         "product_spec", 'img_bkd',
         'inv_qty', 'order_qty', 'sold_qty','rating_cnt', 'rating', 'ave_rating', 
         'review_cnt', "reviews", "featured1","featured2"]

    def get_votes(self, obj):
        return obj.votes.count()
    
    def get_reviews_cnt(self, obj):
        return obj.reviews.count()

    def get_reviews(self, obj):
        return obj.reviews
   
class ProductMinSerializer(serializers.ModelSerializer):
    product_image= ProductImageSerializer(many=True, read_only=True)
  
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "product_image"]
