# Generated by Django 2.1.7 on 2020-08-12 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20200812_1518'),
    ]

    operations = [
        migrations.AlterField(
            model_name='petitionentry',
            name='phone_number',
            field=models.CharField(max_length=20, unique=True),
        ),
    ]