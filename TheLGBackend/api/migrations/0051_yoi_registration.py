# Generated by Django 2.1.7 on 2021-05-25 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0050_merge_20210521_1449'),
    ]

    operations = [
        migrations.CreateModel(
            name='YOI_Registration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('child_first_name', models.CharField(max_length=100)),
                ('payment_complete', models.BooleanField(default=False)),
            ],
        ),
    ]