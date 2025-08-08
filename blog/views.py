from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST
from django.urls import reverse

from .models import Article


def index(request):
    articles = Article.objects.all()
    return render(request, 'blog/home.html', context={'articles': articles})


def article(request, id):
    article = Article.objects.get(id=id)
    return render(request, 'blog/article.html', context={'article': article})


@login_required(redirect_field_name='')
def edit(request, id):
    article = Article.objects.get(id=id)
    if request.method == 'POST':
        content = request.POST.get('content', article.content)
        title = request.POST.get('title')
        article.content = content
        article.title = title
        article.save()
        return redirect(reverse('article', kwargs={'id': article.id}))
    return render(request, 'blog/edit.html', context={'article': article})


@login_required(redirect_field_name='')
def admin(request):
    articles = Article.objects.all()
    return render(request, 'blog/admin.html', context={'articles': articles})


@login_required(redirect_field_name='')
def new(request):
    if request.method == 'POST':
        content = request.POST.get('content')
        title = request.POST.get('title')
        article = Article.objects.create(title=title, content=content)
        article.save()
        return redirect(reverse('article', kwargs={'id': article.id}))
    return render(request, 'blog/new.html')


@login_required(redirect_field_name='')
def delete(request, id):
    article = Article.objects.get(id=id)
    if request.method == 'POST':
        article.delete()
        return redirect(reverse('article', kwargs={'id': article.id}))
    return render(request, 'blog/edit.html', context={'article': article})

def login_admin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True, 'redirect_url': '/admin'})
        else:
            return JsonResponse(
                {'success': False, 'message': 'Неверный логин или пароль'})
    return JsonResponse({'success': False, 'message': 'Недопустимый метод.'})

@require_POST
def logout_admin(request):
    logout(request)
    return JsonResponse({"success": True})
