# Generated by Django 2.1.7 on 2021-06-22 12:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0062_remove_listing_draft'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='expire_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 12, 22, 12, 49, 39, 159405)),
        ),
        migrations.AddField(
            model_name='vehiclelisting',
            name='expire_date',
            field=models.DateTimeField(default=datetime.datetime(2021, 12, 22, 12, 49, 39, 160413)),
        ),
    ]
