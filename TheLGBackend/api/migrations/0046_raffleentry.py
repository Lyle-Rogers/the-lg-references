# Generated by Django 2.1.7 on 2021-04-29 13:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0045_auto_20210429_1352'),
    ]

    operations = [
        migrations.CreateModel(
            name='RaffleEntry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stripeCustomerId', models.CharField(max_length=255)),
                ('stripeRaffleEntryId', models.CharField(max_length=255)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]