# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-06 01:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0004_auto_20170405_2156'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trip',
            name='status',
            field=models.CharField(default='false', max_length=50),
        ),
    ]
