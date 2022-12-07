from django import forms
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class ProfileUpdateForm(UserChangeForm):
    avatar = forms.ImageField(required=False)
    bio = forms.CharField(max_length=400, required=False)

    class Meta:
        model = User
        fields = ['bio', 'avatar']
