from django.urls import path
from .views import ListsView, ListDetailView

urlpatterns = [
    path('lists/', ListsView.as_view()),
    path('list/<int:id>/', ListDetailView.as_view())
]
