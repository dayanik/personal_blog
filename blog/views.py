from django.shortcuts import render


def index(request):
    return render(request, 'blog/home.html')


def article(request):
    return render(request, 'blog/article.html')


def edit(request):
    return render(request, 'blog/edit.html')


def admin(request):
    return render(request, 'blog/admin.html')


def new(request):
    return render(request, 'blog/new.html')
