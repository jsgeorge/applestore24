# Generated by Django 4.0.3 on 2023-02-28 19:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_category_menu_order_alter_producttype_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='inv_qty',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='order_qty',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='product',
            name='sold_qty',
            field=models.IntegerField(default=0),
        ),
    ]
