# Generated by Django 2.1.7 on 2021-05-21 10:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0061_listing_draft'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listing',
            name='draft',
        ),
    ]