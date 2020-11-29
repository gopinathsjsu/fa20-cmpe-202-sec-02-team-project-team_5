# Generated by Django 3.1.2 on 2020-11-29 00:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_listing', '0008_auto_20201125_2247'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='photo_file',
            field=models.FileField(null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='image',
            name='url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
