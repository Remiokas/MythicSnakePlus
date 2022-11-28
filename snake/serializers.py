from rest_framework import serializers
from .models import Plays


class PlaysSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = Plays
        fields = ['user_id', 'bombs_stopped', 'snake_length', 'walls_broken']