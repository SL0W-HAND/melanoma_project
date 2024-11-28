# Description: This file contains the URL patterns for the app.
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("first_model", views.predict1, name="predict1"),
    path("transfer_learning_model", views.predict2, name="predict2"),
]

