from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User

class Grocery(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=False)
    completed = models.BooleanField(blank=False, default=False)
    completedBy = models.ForeignKey(User, blank=True, null=True, on_delete=models.DO_NOTHING, related_name='complete')
    author = models.ForeignKey(User, blank=True, null=True, on_delete=models.DO_NOTHING, related_name='auth')

    def __str__(self):
        """A string representation of the model."""
        return self.title
