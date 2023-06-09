# Generated by Django 4.0.3 on 2023-01-06 18:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('store', '0005_category_menu_order_alter_producttype_name'),
        ('orders', '0003_order_discount_order_price'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='ordered',
            new_name='complete',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='productqty',
            new_name='qty',
        ),
        migrations.RemoveField(
            model_name='order',
            name='name',
        ),
        migrations.RemoveField(
            model_name='order',
            name='productid',
        ),
        migrations.AddField(
            model_name='order',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.product'),
        ),
        migrations.AlterField(
            model_name='order',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
