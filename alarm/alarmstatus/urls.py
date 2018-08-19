from django.urls import path
from . import views

urlpatterns = [
    path('status/<int:pk>', views.StatusRetrieveUpdate.as_view() ),
    path('history', views.HistoryListCreate.as_view() ),
    path('statuslookup', views.StatusLookupRetrieve.as_view() ),
]