# Generated by Django 2.1 on 2018-08-16 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('reason', models.CharField(max_length=300)),
                ('time', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
