# Generated by Django 4.1.1 on 2022-10-10 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('snake', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='snakeuser',
            name='avatar',
            field=models.ImageField(default='default.png', upload_to='avatar_images'),
        ),
    ]
