from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('article/<int:id>', views.article, name='article'),
    path('admin/', views.admin, name='admin'),
    path('edit/<int:id>', views.edit, name='edit'),
    path('new', views.new, name='new'),
    path('delete', views.delete, name='delete'),
    path('login', views.login_admin, name='login'),
    path('logout', views.logout_admin, name='logout'),
]