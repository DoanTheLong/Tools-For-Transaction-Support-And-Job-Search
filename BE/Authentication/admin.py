
from django.contrib import admin
from django.contrib.auth.models import Group
from .models import NhanVien,KhachHang

# Bài tìm vệc
from Rental.models import  BaiTimViec

# Bài thuê
from Booking.models import  BaiThue

#Giao dịch
from Transaction.models import GiaoDich
# Thông báo
from Notification.models import Notification
class KhachHangAdmin(admin.ModelAdmin):
    actions = []
    exclude = ["date_expired","anh_dai_dien","last_login","groups"]

    list_display = ('ma_khach_hang','ho_ten', 'phone_number','email','ngay_sinh')
    search_fields = ('ho_ten',)
    list_filter = ('ho_ten',"is_staff")

    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions

class NhanVienAdmin(admin.ModelAdmin):
    exclude = ["date_expired","anh_dai_dien","last_login","groups"]

    list_display = ('ma_nhan_vien','ho_ten', 'phone_number','email','ngay_sinh')
    search_fields = ('ho_ten',"phone_number")
    list_filter = ('ho_ten',)
    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions


class NotificationAdmin(admin.ModelAdmin):
    exclude = []

    list_display = ('tieu_de','mota_ngan', 'loai','ngay_tao')
    search_fields = ()
    list_filter = ()
    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id','tieu_de', 'mo_ta_ngan','dia_chi',"da_duyet")

class RentalAdmin(admin.ModelAdmin):
    list_display = ('id','tieu_de', 'chi_tiet','price','da_duyet')


class GiaoDichAdmin(admin.ModelAdmin):
    exclude = []

    list_display = ('id','thoi_gian_lam_viec', 'trang_thai','gia_tri')
    search_fields = ()
    list_filter = ()
    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']
        return actions




admin.site.register(KhachHang,KhachHangAdmin)
admin.site.register(NhanVien,NhanVienAdmin)
admin.site.register(BaiTimViec,RentalAdmin)
admin.site.register(BaiThue,BookingAdmin)
admin.site.register(Notification,NotificationAdmin)

admin.site.register(GiaoDich,GiaoDichAdmin)


admin.site.unregister(Group)


