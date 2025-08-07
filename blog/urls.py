from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('article/', views.article, name='article'),
    path('admin/', views.admin, name='admin'),
    path('edit', views.edit, name='edit'),
    path('new', views.new, name='new'),
]