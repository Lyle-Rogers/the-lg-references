# Generated by Django 2.1.7 on 2020-08-31 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_challenge'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('date', models.DateField()),
                ('summary', models.TextField()),
                ('video', models.URLField(blank=True, null=True)),
                ('images', models.URLField(blank=True, null=True)),
                ('challenges', models.ManyToManyField(to='api.Challenge')),
            ],
        ),
    ]
