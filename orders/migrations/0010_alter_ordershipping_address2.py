# Generated by Django 4.0.3 on 2023-03-02 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0009_alter_ordershipping_address2'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordershipping',
            name='address2',
            field=models.CharField(blank=True, default='', max_length=200, null=True),
        ),
    ]
