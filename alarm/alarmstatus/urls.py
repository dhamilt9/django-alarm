from django.urls import path
from . import views

urlpatterns = [
    path('alarm/<int:pk>', views.AlarmRetrieve.as_view() ),
    path('requesthistory', views.RequestsListCreate.as_view() ),
    path('ringalarm', views.RingAlarmView.as_view() ),
    path('piupdate', views.PiUpdateView.as_view() ),
]