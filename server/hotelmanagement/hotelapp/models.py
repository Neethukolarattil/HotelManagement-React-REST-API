from django.db import models

# Create your models here.


class Hotel(models.Model):
    name = models.CharField(max_length=100)
    place = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=100)
    price = models.PositiveIntegerField()
    



# Rest-React Project

# virtualenv venv
# pip install django
# pip install djangorestframework
# django-admin startproject hotelmanagement
# cd hotelmanagement
# python manage.py startapp hotelapp
# cors headers

# client

# npm i vite
# npm create vite@latest
# pname:hotelmanagement
# npm i bootstrap react-bootstrap axios react-router-dom
# bootswatch.com template
# toastify

