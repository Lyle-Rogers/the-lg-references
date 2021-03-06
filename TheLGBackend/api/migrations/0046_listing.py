# Generated by Django 2.1.7 on 2021-03-22 14:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0045_listingimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('category', models.PositiveSmallIntegerField(choices=[(1, 'Antiques & collectibles'), (2, 'Arts & Crafts'), (3, 'Auto Parts & Accessories'), (4, 'Baby Products'), (5, 'Misc')], default=5)),
                ('description', models.TextField(blank=True, null=True)),
                ('photos', models.ManyToManyField(blank=True, null=True, to='api.ListingImage')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
