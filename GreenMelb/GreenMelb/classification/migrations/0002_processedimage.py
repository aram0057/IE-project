# Generated by Django 4.2.5 on 2024-08-29 02:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classification', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProcessedImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('original_image', models.ImageField(upload_to='uploads/')),
                ('processed_image', models.ImageField(upload_to='processed/')),
                ('upload_time', models.DateTimeField(auto_now_add=True)),
                ('processed_time', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]