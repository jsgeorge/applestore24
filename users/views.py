from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import *
# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data = super().validate(attrs)

        serialier = UserSerializerWithToken(self.user).data
        for k, v in serialier.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
     serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getUsers(request):
    users= User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    print('getUserProfile')
    user = request.user
    print(user)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    print(data)
    user = User.objects.create(
        first_name=data['firstname'],
        last_name=data['lastname'],
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])
    )
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def updateUser(request):
    user = request.user
    data = request.data
    user = User.objects.get(id=user.id)
    print(data)
    print(user.first_name)
    user.first_name=data['firstname']
    user.last_name=data['lastname']
    user.username=data['username']
    user.email=data['email']
    user.save()
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def updatePassword(request):
    user = request.user
    data = request.data
    user = User.objects.get(id=user.id)
    user.password=make_password(data['password'])
    user.save()
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)