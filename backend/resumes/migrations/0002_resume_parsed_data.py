# Generated by Django 5.2 on 2025-04-17 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resumes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='resume',
            name='parsed_data',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
