# Generated by Django 2.1.7 on 2021-03-23 10:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0050_listing_delivery'),
    ]

    operations = [
        migrations.CreateModel(
            name='VehicleListing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body_style', models.PositiveSmallIntegerField(choices=[(1, 'Coupe'), (2, 'Truck'), (3, 'Sedan'), (4, 'Hatchback'), (5, 'SUV'), (6, 'Convertible'), (7, 'Wagon'), (8, 'Minivan'), (9, 'Small Car'), (10, 'Other')])),
                ('condition', models.PositiveSmallIntegerField(choices=[(1, 'Excellent'), (2, 'Very Good'), (3, 'Good'), (4, 'Fair'), (5, 'Poor')])),
                ('description', models.TextField(blank=True, null=True)),
                ('exterior_color', models.PositiveSmallIntegerField(choices=[(1, 'Black'), (2, 'Blue'), (3, 'Brown'), (4, 'Gold'), (5, 'Green'), (6, 'Gray'), (7, 'Pink'), (8, 'Purple'), (9, 'Red'), (10, 'Silver'), (11, 'Orange'), (12, 'White'), (13, 'Yellow'), (14, 'Charcoal'), (15, 'Off White'), (16, 'Tan'), (17, 'Beige'), (18, 'Burgundy'), (19, 'Turquoise')])),
                ('fuel_type', models.PositiveSmallIntegerField(choices=[(1, 'Diesel'), (2, 'Electric'), (3, 'Gasoline'), (4, 'Flex'), (5, 'Hybrid'), (6, 'Petrol'), (7, 'Plug-in hybrid'), (8, 'Other')])),
                ('interior_color', models.PositiveSmallIntegerField(choices=[(1, 'Black'), (2, 'Blue'), (3, 'Brown'), (4, 'Gold'), (5, 'Green'), (6, 'Gray'), (7, 'Pink'), (8, 'Purple'), (9, 'Red'), (10, 'Silver'), (11, 'Orange'), (12, 'White'), (13, 'Yellow'), (14, 'Charcoal'), (15, 'Off White'), (16, 'Tan'), (17, 'Beige'), (18, 'Burgundy'), (19, 'Turquoise')])),
                ('location', models.TextField(blank=True, null=True)),
                ('make', models.PositiveSmallIntegerField(choices=[(1, 'Abarth'), (2, 'Alfa Romeo'), (3, 'Aston Martin'), (4, 'Audi'), (5, 'Bentley'), (6, 'BMW'), (7, 'Bugatti'), (8, 'Cadillac'), (9, 'Chevrolet'), (10, 'Chrysler'), (11, 'Citroën'), (12, 'Dacia'), (13, 'Daewoo'), (14, 'Daihatsu'), (15, 'Dodge'), (16, 'Donkervoort'), (17, 'DS'), (18, 'Ferrari'), (19, 'Fiat'), (20, 'Fisker'), (21, 'Ford'), (22, 'Honda'), (23, 'Hummer'), (24, 'Hyundai'), (25, 'Infiniti'), (26, 'Iveco'), (27, 'Jaguar'), (28, 'Jeep'), (29, 'Kia'), (30, 'KTM'), (31, 'Lada'), (32, 'Lamborghini'), (33, 'Lancia'), (34, 'Land Rover'), (35, 'Landwind'), (36, 'Lexus'), (37, 'Lotus'), (38, 'Maserati'), (39, 'Maybach'), (40, 'Mazda'), (41, 'McLaren'), (42, 'Mercedes-Benz'), (43, 'MG'), (44, 'Mini'), (45, 'Mitsubishi'), (46, 'Morgan'), (47, 'Nissan'), (48, 'Opel'), (49, 'Peugeot'), (50, 'Porsche'), (51, 'Renault'), (52, 'Rolls-Royce'), (53, 'Rover'), (54, 'Saab'), (55, 'Seat'), (56, 'Skoda'), (57, 'Smart'), (58, 'SsangYong'), (59, 'Subaru'), (60, 'Suzuki'), (61, 'Tesla'), (62, 'Toyota'), (63, 'Volkswagen'), (64, 'Volvo')])),
                ('mileage', models.IntegerField()),
                ('model', models.CharField(max_length=1500)),
                ('price', models.DecimalField(decimal_places=2, max_digits=100)),
                ('transmission', models.PositiveSmallIntegerField(choices=[(1, 'Manual Transmission'), (2, 'Automatic Transmission')])),
                ('year', models.IntegerField()),
                ('photos', models.ManyToManyField(blank=True, null=True, to='api.ListingImage')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='listing',
            name='category',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Antiques & collectibles'), (2, 'Arts & Crafts'), (3, 'Auto Parts & Accessories'), (4, 'Baby Products'), (5, 'Bags & Luggage'), (6, 'Books, Movies & Music'), (7, 'Cell PHone & Accessories'), (8, 'Clothing, Shoes & Accessories'), (9, 'Electronics'), (10, 'Furniture'), (11, 'Health & Beauty'), (12, 'Home & Kitchen'), (13, 'Jewelry & Watches'), (14, 'Musical Instruments'), (15, 'Office Supplies'), (16, 'Patio & Garden'), (17, 'Pet Supplies'), (18, 'Sporting Goods'), (19, 'Tools & Home Improvement'), (20, 'Toys & Games'), (21, 'Vehicles'), (22, 'Video Games & Consoles'), (23, 'Miscellaneous')]),
        ),
        migrations.AlterField(
            model_name='listing',
            name='price',
            field=models.DecimalField(decimal_places=2, max_digits=100),
        ),
    ]