# Generated by Django 4.2.3 on 2024-02-29 08:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Authentication', '0004_rename_avatar_user_anh_dai_dien_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='NhanVien',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('ma_nhan_vien', models.CharField(max_length=100)),
            ],
            options={
                'abstract': False,
            },
            bases=('Authentication.user',),
        ),
    ]