# Generated by Django 2.1.7 on 2021-06-22 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0063_auto_20210622_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='expire_date',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='vehiclelisting',
            name='expire_date',
            field=models.DateTimeField(),
        ),
    ]
