# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-07 16:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taggings', '0003_tagging_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tagging',
            name='category',
            field=models.CharField(default='other', max_length=250),
        ),
    ]