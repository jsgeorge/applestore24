"""nextdrf URL Configuration
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
#from rest_framework.authtoken.views import obtain_auth_token
    
urlpatterns = [
    path('admin/', admin.site.urls),
    #React project view 
    path('', TemplateView.as_view(template_name='index.html')),
    #Django api views
    path('api/store/', include("store.urls", namespace="store")),
    path('api/cart/', include("cart.urls", namespace="cart")),
    path('api/orders/', include("orders.urls", namespace="orders")),
    #path('auth/', obtain_auth_token),
    path('api/users/', include('users.urls', namespace='users'))
]

# if settings.DEBUG:
urlpatterns += static(settings.MEDIA_URL,  document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL,  document_root=settings.STATIC_ROOT)