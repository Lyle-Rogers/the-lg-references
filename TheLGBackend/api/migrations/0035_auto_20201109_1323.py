# Generated by Django 2.1.7 on 2020-11-09 20:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_auto_20201102_1343'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='businesspagepost',
            options={'ordering': ['created_at']},
        ),
    ]