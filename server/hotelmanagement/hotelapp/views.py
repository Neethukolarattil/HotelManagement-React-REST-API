from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializer import HotelSerializer
from .models import Hotel

# Create your views here.

class HotelView(ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
