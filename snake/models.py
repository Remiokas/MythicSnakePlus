from django.db import models
from django.contrib.auth.models import AbstractUser


class SnakeUser(AbstractUser):
    avatar = models.ImageField(default='default.png', upload_to='avatar_images')
    bio = models.TextField('Bio', default='')


class Plays(models.Model):
    user = models.ForeignKey('SnakeUser', on_delete=models.SET_NULL, null=True)
    snake_length = models.IntegerField('snake_length', default=0)
    bombs_stopped = models.IntegerField('bombs_stopped', default=0)
    walls_broken = models.IntegerField('walls_broken', default=0)
