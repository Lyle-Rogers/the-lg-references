# Generated by Django 2.1.7 on 2021-01-25 21:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0029_auto_20210105_0926'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='language',
            field=models.CharField(choices=[('ENGLISH', 'English'), ('SPANISH', 'Spanish')], default='ENGLISH', max_length=20),
        ),
    ]
