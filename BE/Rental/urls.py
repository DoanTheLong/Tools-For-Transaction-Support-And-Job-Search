from .views import (RentalListAPIView,
                    RentalCreateAPIView,
                    RentalRelativeListAPIView,
                    RentalDetailAPIView,
                    RentalFilterListAPIView,
                    RentalListFromUserAPIView,
                    RentalApproveAPIView,
RentalRefuseAPIView,RentalListByKhachHangAPIView
                    )

from django.urls import path

urlpatterns = [


    path("posts/", RentalListAPIView.as_view()),
    path("posts/<str:pk>/", RentalFilterListAPIView.as_view()),

    path("post/detail/<str:pk>/", RentalDetailAPIView.as_view()),
    path("post/create/", RentalCreateAPIView.as_view()),

    #duyệt bài
    path('post/approve/<str:pk>/', RentalApproveAPIView.as_view()),
    path('post/refuse/<str:pk>/', RentalRefuseAPIView.as_view()),
    path('posts/bykhachhang/<str:idkh>/', RentalListByKhachHangAPIView.as_view()),

]
