from django.urls import path
from .views import ListCreateGiaoDichView, ListGetGiaoDichByKHIDAPIView,ThongKeAPIView,DetailUpdateGiaoDichView,CreateGiaoDichView

urlpatterns = [
    path('giaodich/', ListCreateGiaoDichView.as_view()),
    path('giaodich/create/', CreateGiaoDichView.as_view()),
    path('giaodich/<str:pk>/', DetailUpdateGiaoDichView.as_view()),
    path('giaodich/getByKhachHangId/<str:id>/', ListGetGiaoDichByKHIDAPIView.as_view()),
    path('thongke/', ThongKeAPIView.as_view()),

]
