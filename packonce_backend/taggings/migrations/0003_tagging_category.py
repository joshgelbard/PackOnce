# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-07 05:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taggings', '0002_auto_20170407_0524'),
    ]

    operations = [
        migrations.AddField(
            model_name='tagging',
            name='category',
            field=models.CharField(blank=True, max_length=250),
        ),
    ]