from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User

class Userprofile(models.Model):
    bio = models.TextField(blank=True)
    allergies = models.TextField(blank=True)
    user = models.OneToOneField(User, blank=True, null=False, on_delete=models.DO_NOTHING, related_name='us', primary_key=True)

    def __str__(self):
        """A string representation of the model."""
        return self.user.username



