import imp
from django.shortcuts import render
from .models import models
from rest_framework import generics, status
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.core.paginator import Paginator

# Create your views here.
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    #paginator = Paginator(queryset,4) #So 4 produts per page
    
    filter_backends = [SearchFilter]
    search_fields = ['name']
     
    
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

class ProductLatestListView(generics.ListAPIView):
    queryset = Product.objects.order_by('created_at').reverse()[:6]
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

class ProductFeatured1ListView(generics.ListAPIView):
    queryset = Product.objects.filter(featured1=True)
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

class ProductFeatured2ListView(generics.ListAPIView):
    queryset = Product.objects.filter(featured2=True).order_by('created_at').reverse()
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

class ProductTopRatedListView(generics.ListAPIView):
    queryset = Product.objects.filter(rating__gt=4).reverse()[:6]
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)


class ProductDetailView(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rate_Product(request, pk):
       
        if 'stars' in request.data:
            product = Product.objects.get(id=pk)
            user = request.user
            rating = request.data['stars']
    
            try:
                vote = ProductRating.objects.get(user=user,product=product)
               
                serializer = ProductRatingSerializer(vote, many=False)
                response = {'message': "You already submitted a review for this product"}
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
                #return redirect("/")
            except:
            
                vote = ProductRating.objects.create(user=user, product=product, rating=rating)
                
                
                votes = product.vote_set.all()
                product.no_ratings = len(votes)
                total = 0
                for i in votes:
                     total += i.rating
                
                product.rating = total
                product.save()

                serializer = ProductRatingSerializer(vote, many=False)
                response = {
                    'message': "Rating created",
                    'result': serializer.data}


              
                return Response(response, status=status.HTTP_200_OK)
                # return redirect("/")
        else:
            response = {'message': "Error you need to provide stars"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def review_Product(request, pk):
      
  
        product = Product.objects.get(id=pk)
        user = request.user
        content = request.data['content']

        try:
            vote = ProductReview.objects.get(user=user,product=product)
         
            serializer = ProductReviewSerializer(vote, many=False)
            response = {'message': "You already submitted a review for this product"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
            #return redirect("/")
        except:
           
            vote = ProductReview.objects.create(user=user, name=user.name,product=product, content=content)
            serializer = ProductReviewSerializer(vote, many=False)
            response = {
                'message': "Review created",
                'result': serializer.data}
            return Response(response, status=status.HTTP_200_OK)
            # return redirect("/")
       
@api_view(['POST'])
def view_reviews( request,pk):
                product = Product.objects.get(id=pk)
                list_item = ProductReview.objects.filter(Product=product)
                serializer = ProductReviewSerializer(list_item, many=True)
                response =  serializer.data
              
                return Response(response, status=status.HTTP_200_OK)






def order_add(request):
    
    user = request.user
    data = request.data

class ProductImageListView(generics.ListAPIView):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = (AllowAny,)

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(level=0).order_by('menu_order')
    serializer_class = CategorySerializer
    permission_classes = (AllowAny,)

class CategoryDetailView(generics.RetrieveAPIView):
    lookup_field = "slug"
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = (AllowAny,)

    def get_queryset(self):
        return  Product.objects.filter(
            category__slug=self.kwargs["slug"]
            )
        #  return  Product.objects.filter(  
        #      category__in=Category.objects.get(slug=self.kwargs["slug"])
        #   )
class ProductTypeListView(generics.ListAPIView):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer
    permission_classes = (AllowAny,)