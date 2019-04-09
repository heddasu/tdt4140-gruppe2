from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User

class Comment(models.Model):
    comment = models.TextField(blank=False)
    author = models.ForeignKey(User, blank=True, null=True, on_delete=models.DO_NOTHING, related_name='authr')

    def __str__(self):
        """A string representation of the model."""
        return self.comment



