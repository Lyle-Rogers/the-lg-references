# Generated by Django 2.1.7 on 2020-08-31 18:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_event'),
    ]

    operations = [
        migrations.AddField(
            model_name='challenge',
            name='repeat',
            field=models.CharField(choices=[(1, 'Never'), (2, 'Weekly'), (3, 'Bi-Weekly'), (4, 'Bi-Monthly'), (5, 'Monthly')], default=1, max_length=10),
        ),
    ]
