# Generated by Django 2.1.7 on 2020-08-12 20:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_petitionentry'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='petitionentry',
            name='user',
        ),
        migrations.AddField(
            model_name='petitionentry',
            name='date',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='petitionentry',
            name='name',
            field=models.CharField(default=1, max_length=150),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='petitionentry',
            name='phone_number',
            field=models.IntegerField(),
        ),
    ]
