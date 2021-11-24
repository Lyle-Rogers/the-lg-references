# Generated by Django 2.1.7 on 2020-11-02 20:41

import backend.storage_backends
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_businesspage'),
    ]

    operations = [
        migrations.CreateModel(
            name='BusinessPagePhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('file', models.FileField(storage=backend.storage_backends.BusinessPagePhotoStorage(), upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='BusinessPagePost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.TextField(blank=True, null=True)),
                ('text', models.TextField(blank=True, null=True)),
                ('photos', models.ManyToManyField(to='api.BusinessPagePhoto')),
            ],
        ),
        migrations.AddField(
            model_name='businesspage',
            name='banner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='banner', to='api.BusinessPagePhoto'),
        ),
        migrations.AddField(
            model_name='businesspage',
            name='photos',
            field=models.ManyToManyField(to='api.BusinessPagePhoto'),
        ),
        migrations.AddField(
            model_name='businesspage',
            name='posts',
            field=models.ManyToManyField(to='api.BusinessPagePost'),
        ),
    ]