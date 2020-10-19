# To connect to SampleRESTfulApi to external apps via Json data

# Serialization helps in data flow in Json formart to and fro communication

# Json to Python and vice versa

from rest_framework import serializers
from .models import SamplerestfulapiDevelopers

class DevelopersSerializer(serializers.ModelSerializer):
    class Meta:
        model = SamplerestfulapiDevelopers
        # to serialize all columns in Developers table 
        # inorder to serialize particular clumns list them as ('column1';'column2') 
        fields = '__all__' 


