# Generated by Django 2.1.7 on 2020-10-12 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0023_auto_20201007_1446'),
    ]

    operations = [
        migrations.AlterField(
            model_name='challengesubmission',
            name='amount',
            field=models.DecimalField(blank=True, decimal_places=5, max_digits=20, null=True),
        ),
    ]