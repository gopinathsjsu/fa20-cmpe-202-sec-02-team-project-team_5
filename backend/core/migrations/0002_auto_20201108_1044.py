# Generated by Django 3.1.2 on 2020-11-08 10:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email_id', models.CharField(max_length=100)),
                ('password_hash', models.CharField(max_length=100)),
                ('is_active', models.BooleanField(default=True, null=True)),
                ('created_datetime', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'user',
            },
        ),
        migrations.CreateModel(
            name='UserAdditionalInfo',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('sex', models.CharField(blank=True, max_length=1, null=True)),
                ('dob', models.DateField(blank=True, null=True)),
                ('credit_score', models.IntegerField(blank=True, null=True)),
                ('employment_type', models.CharField(blank=True, max_length=100, null=True)),
                ('annual_salary', models.IntegerField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.user')),
            ],
            options={
                'db_table': 'user_additional_info',
            },
        ),
        migrations.CreateModel(
            name='UserAdditionalInfoLog',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('user_additional_info_id', models.BigIntegerField()),
                ('user_id', models.BigIntegerField()),
                ('sex', models.CharField(blank=True, max_length=1, null=True)),
                ('dob', models.DateField(blank=True, null=True)),
                ('credit_score', models.IntegerField(blank=True, null=True)),
                ('employment_type', models.CharField(blank=True, max_length=100, null=True)),
                ('annual_salary', models.IntegerField(blank=True, null=True)),
                ('reason', models.CharField(max_length=100)),
                ('created_by', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'user_additional_info_log',
            },
        ),
        migrations.CreateModel(
            name='UserLog',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('user_id', models.BigIntegerField()),
                ('role_id', models.IntegerField()),
                ('user_status_id', models.IntegerField()),
                ('user_type_id', models.IntegerField(blank=True, null=True)),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('email_id', models.CharField(max_length=100)),
                ('password_hash', models.CharField(max_length=100)),
                ('is_active', models.BooleanField(default=True, null=True)),
                ('created_datetime', models.DateTimeField(auto_now_add=True, null=True)),
                ('reason', models.CharField(max_length=100)),
                ('created_by', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'user_log',
            },
        ),
        migrations.CreateModel(
            name='UserStatus',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=100)),
                ('created_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('is_active', models.BooleanField(default=True, null=True)),
            ],
            options={
                'db_table': 'user_status',
            },
        ),
        migrations.CreateModel(
            name='UserType',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=100)),
                ('is_active', models.BooleanField(default=True, null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('deleted_why', models.CharField(blank=True, max_length=100, null=True)),
                ('deleted_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
            options={
                'db_table': 'user_type',
            },
        ),
        migrations.DeleteModel(
            name='AuthGroup',
        ),
        migrations.DeleteModel(
            name='AuthGroupPermissions',
        ),
        migrations.DeleteModel(
            name='AuthPermission',
        ),
        migrations.DeleteModel(
            name='AuthUser',
        ),
        migrations.DeleteModel(
            name='AuthUserGroups',
        ),
        migrations.DeleteModel(
            name='AuthUserUserPermissions',
        ),
        migrations.DeleteModel(
            name='DjangoAdminLog',
        ),
        migrations.DeleteModel(
            name='DjangoContentType',
        ),
        migrations.DeleteModel(
            name='DjangoMigrations',
        ),
        migrations.DeleteModel(
            name='DjangoSession',
        ),
        migrations.AlterField(
            model_name='role',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='role',
            name='description',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='role',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='role',
            name='is_active',
            field=models.BooleanField(default=True, null=True),
        ),
        migrations.AlterField(
            model_name='role',
            name='name',
            field=models.CharField(max_length=50),
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.role'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_status',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='core.userstatus'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='core.usertype'),
        ),
    ]