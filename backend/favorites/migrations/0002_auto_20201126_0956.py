# Generated by Django 3.1.2 on 2020-11-26 09:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_auto_20201124_2150'),
        ('favorites', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FavoriteSearch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('query_params', models.JSONField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('deleted_why', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.user')),
            ],
        ),
        migrations.AlterField(
            model_name='favoritelisting',
            name='deleted_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='favoritelisting',
            name='deleted_why',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.DeleteModel(
            name='FavoriteSearches',
        ),
    ]