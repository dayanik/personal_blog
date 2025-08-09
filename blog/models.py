import bleach
import mistune

from django.db import models


ALLOWED_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"]
ALLOWED_ATTRIBUTES = {}
PLUGINS = ["table", "strikethrough", "footnotes", "task_lists"]


class CustomRenderer(mistune.HTMLRenderer):
    def block_html(self, html):
        cleaned = bleach.clean(html, tags=ALLOWED_TAGS,
                               attributes=ALLOWED_ATTRIBUTES, strip=True)
        return cleaned


class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    date = models.DateField(auto_now=True)

    def get_content_as_html(self):
        md = mistune.create_markdown(plugins=PLUGINS, renderer=CustomRenderer())
        return md(self.content)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-date']
