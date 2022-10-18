from django.views import generic
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from .forms import RegisterForm
from django.contrib import messages
from .models import SnakeUser, Plays


class PlayView(generic.ListView):
    template_name = 'snake.html'
    queryset = ''


class HomeView(generic.ListView):
    template_name = 'home.html'
    queryset = ''


class RegisterView(generic.FormView):
    template_name = 'register.html'
    form_class = RegisterForm
    success_url = '/'

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'You Have Registered Successfully')
            return HttpResponseRedirect('/')
        return render(request, self.template_name, {'form': form})


class LoginView(generic.FormView):
    template_name = 'login.html'
    form_class = AuthenticationForm


class ProfileView(generic.ListView):
    template_name = 'profile.html'
    model = SnakeUser, Plays
    queryset = ''

    def get_context_data(self, *args, **kwargs):
        context = super(ProfileView, self).get_context_data(*args, **kwargs)
        context['user'] = get_object_or_404(SnakeUser, username__icontains=self.kwargs['username'])
        return context


class GameRulesView(generic.ListView):
    template_name = 'how-to-play.html'
    queryset = ''
