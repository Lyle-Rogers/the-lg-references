# Generated by Django 2.1.7 on 2020-09-11 18:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_agreementsubmission'),
    ]

    operations = [
        migrations.RenameField(
            model_name='agreementsubmission',
            old_name='agreeement',
            new_name='agreement',
        ),
    ]