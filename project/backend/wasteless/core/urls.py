from django.urls import path
from .views import TokenAuthenticate, UserList

urlpatterns = [
    path('current_user/', TokenAuthenticate.as_view()),
    path('users/', UserList.as_view())
]
