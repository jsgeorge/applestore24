# Generated by Django 4.0.3 on 2023-01-17 22:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_category_menu_order_alter_producttype_name'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('orders', '0005_alter_order_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='discount',
        ),
        migrations.RemoveField(
            model_name='order',
            name='price',
        ),
        migrations.RemoveField(
            model_name='order',
            name='product',
        ),
        migrations.RemoveField(
            model_name='order',
            name='qty',
        ),
        migrations.CreateModel(
            name='OrderShipping',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=200)),
                ('address2', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('state', models.CharField(max_length=200)),
                ('zip', models.CharField(max_length=200)),
                ('country', models.CharField(max_length=200)),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='orders.order')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrderDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('discount', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
                ('order_date', models.DateTimeField(auto_now_add=True)),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='orders.order')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.product')),
            ],
        ),
    ]
