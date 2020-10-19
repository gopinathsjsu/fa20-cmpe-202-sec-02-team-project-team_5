from django.db import models

# Create your models here.

class Developers(models.Model):
    sjsuID = models.IntegerField(primary_key=True)
    fullname = models.CharField(max_length = 50)
    component = models.CharField(max_length = 15)
    contact = models.CharField (max_length = 10)