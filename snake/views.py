from django.views import generic
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from .forms import RegisterForm, ProfileUpdateForm
from django.contrib import messages
from .models import SnakeUser, Plays
from rest_framework import generics, permissions
from .serializers import PlaysSerializer


class PlayView(generic.ListView):
    template_name = 'snake.html'
    queryset = ''


class HomeView(generic.ListView):
    template_name = 'home.html'
    queryset = ''
    model = Plays

    def get_context_data(self, *args, **kwargs):
        context = {'snake': Plays.objects.order_by('-snake_length').first(),
                   'walls': Plays.objects.order_by('-walls_broken').first(),
                   'bombs': Plays.objects.order_by('-bombs_stopped').first()
                   }
        return context


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


class PlaysListApi(generics.ListCreateAPIView):
    queryset = Plays.objects.all()
    serializer_class = PlaysSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)


class PlayerScoreApi(generics.ListCreateAPIView):
    queryset = Plays.objects.all()
    serializer_class = PlaysSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Plays.objects.filter(user_id=self.kwargs['pk'])
        return queryset
