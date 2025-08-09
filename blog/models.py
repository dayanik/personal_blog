from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    date = models.DateField(auto_now=True)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-date']
