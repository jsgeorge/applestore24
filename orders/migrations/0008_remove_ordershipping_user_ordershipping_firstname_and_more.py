# Generated by Django 4.0.3 on 2023-02-27 23:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0007_order_order_shipping_order_order_total_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordershipping',
            name='user',
        ),
        migrations.AddField(
            model_name='ordershipping',
            name='firstname',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='ordershipping',
            name='lastname',
            field=models.CharField(default='', max_length=200),
        ),
    ]
