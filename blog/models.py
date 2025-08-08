import mistune

from django.db import models


class CustomRenderer(mistune.HTMLRenderer):
    def block_html(self, html):
        """Разрешаем только заголовки h1-h6, остальной HTML экранируем"""
        if html.strip().startswith(("<h1", "<h2", "<h3", "<h4", "<h5", "<h6")):
            return html  # Разрешаем заголовки
        return mistune.escape(html)  # Остальной HTML экранируем


class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    date = models.DateField(auto_now=True)

    def get_content_as_html(self):
        return mistune.create_markdown(
            plugins=["table"], renderer=CustomRenderer())(self.content)

    def __str__(self):
        return self.title
