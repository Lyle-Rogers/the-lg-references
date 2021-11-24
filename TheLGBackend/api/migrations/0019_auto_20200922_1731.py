# Generated by Django 2.1.7 on 2020-09-22 23:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_auto_20200922_1729'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='createdBy',
            field=models.ForeignKey(default=1, on_delete=None, related_name='createdBy', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='blog',
            name='lastUpdatedBy',
            field=models.ForeignKey(default=1, on_delete=None, related_name='lastUpdatedBy', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]