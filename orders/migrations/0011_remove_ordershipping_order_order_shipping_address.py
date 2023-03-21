# Generated by Django 4.0.3 on 2023-03-06 17:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_alter_ordershipping_address2'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordershipping',
            name='order',
        ),
        migrations.AddField(
            model_name='order',
            name='shipping_address',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='orders.ordershipping'),
        ),
    ]
