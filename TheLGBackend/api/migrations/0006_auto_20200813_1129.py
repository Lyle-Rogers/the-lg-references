# Generated by Django 2.1.7 on 2020-08-13 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20200812_1524'),
    ]

    operations = [
        migrations.AlterField(
            model_name='petitionentry',
            name='phone_number',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='petitionentry',
            name='signature',
            field=models.ImageField(blank=True, null=True, upload_to='sig_images'),
        ),
    ]
