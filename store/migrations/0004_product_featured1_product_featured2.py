# Generated by Django 4.0.3 on 2022-09-05 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_product_headline'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='featured1',
            field=models.BooleanField(default=False, verbose_name='Featured1'),
        ),
        migrations.AddField(
            model_name='product',
            name='featured2',
            field=models.BooleanField(default=False, verbose_name='Featured2'),
        ),
    ]
