# Generated by Django 2.1.7 on 2021-06-08 14:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0066_communitycomment_communitypost'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='communitycomment',
            name='createdBy',
        ),
        migrations.RemoveField(
            model_name='communitycomment',
            name='parent',
        ),
        migrations.RemoveField(
            model_name='communitypost',
            name='createdBy',
        ),
        migrations.DeleteModel(
            name='CommunityComment',
        ),
        migrations.DeleteModel(
            name='CommunityPost',
        ),
    ]