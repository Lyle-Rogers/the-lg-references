# Generated by Django 2.1.7 on 2020-11-10 21:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0037_auto_20201109_1342'),
    ]

    operations = [
        migrations.AddField(
            model_name='directory',
            name='businessPage',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.BusinessPage'),
        ),
    ]
