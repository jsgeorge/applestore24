from django.urls import path
from . import views
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
# )
app_name="users"

urlpatterns =[
    path('', views.getUsers, name="users"),
    # path('login/', TokenObtainPairView.as_view(), 
    #      name='token_obtain_view'),
    path('signup/', views.registerUser, name="register"),
    path('login/', views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name="profile"),
    path('update-profile/', views.updateUser, name="update_profile"),
    path('update-password/', views.updatePassword, name="update_password"),
]