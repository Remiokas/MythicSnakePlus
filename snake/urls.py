from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('play/', views.PlayView.as_view(), name='play'),
    path('', views.HomeView.as_view(), name='home'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('', include('django.contrib.auth.urls')),
    path('<str:username>', views.ProfileView.as_view(), name='profile'),
    path('how-to-play/', views.GameRulesView.as_view(), name='how-to-play')
] + (static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) +
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))