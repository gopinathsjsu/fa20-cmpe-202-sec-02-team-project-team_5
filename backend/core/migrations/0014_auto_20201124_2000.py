# Generated by Django 3.1.2 on 2020-11-25 04:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0013_auto_20201122_1304'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useradditionalinfo',
            name='annual_salary',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
