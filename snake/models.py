from django.db import models
from django.contrib.auth.models import AbstractUser


class SnakeUser(AbstractUser):
    avatar = models.ImageField(default='default.png', upload_to='avatar_images')
    bio = models.TextField('Bio', default='')


class Plays(models.Model):
    user = models.ForeignKey('SnakeUser', on_delete=models.SET_NULL, null=True)
    score = models.IntegerField('Score')
