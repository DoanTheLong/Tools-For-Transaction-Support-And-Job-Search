from rest_framework import generics, status

from Authentication.models import User, KhachHang
from ultis.api_helper import api_decorator
from ultis.helper import CustomPagination
from .models import (
    BaiTimViec)
from .serializers import RentalCreateSerializer, BaiTimViecsSerializer, RentalDetailSerializer

from rest_framework.views import APIView


# Danh sách tất cả bài tìm việc có phân trang
class RentalListAPIView(APIView):
    @api_decorator
    def get(self, request):
        posts = BaiTimViec.objects.all().order_by('ngay_khoi_tao')
        serializer = BaiTimViecsSerializer(posts, many=True, context={'request': request})

        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK


# Tạo một bài Tìm việc mới
class RentalCreateAPIView(APIView):
    @api_decorator
    def post(self, request):
        khach_hang_id = request.data.get('khach_hang', None)
        khach_hang = KhachHang.objects.filter(idkh=khach_hang_id).first()
        serializer = RentalCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            serializer.save(khach_hang=khach_hang)
            return serializer.data, "Create rental post successfully", status.HTTP_201_CREATED


# Chi tiết một bài Tìm việc
class RentalDetailAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        queryset = BaiTimViec.objects.get(id=pk)
        serializer = RentalDetailSerializer(queryset, context={'request': request})
        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK


class RentalFilterListAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        posts = BaiTimViec.objects.filter().order_by('-created_at')

        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = BaiTimViecsSerializer(result_page, many=True, context={'request': request})
        data = paginator.get_paginated_response(serializer.data).data

        return data, "Retrieve data successfully", status.HTTP_200_OK


class RentalRelativeListAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        current_post = BaiTimViec.objects.get(id=pk)
        posts = BaiTimViec.objects.filter(location=current_post.location).order_by('-created_at')

        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = BaiTimViecsSerializer(result_page, many=True, context={'request': request})
        data = paginator.get_paginated_response(serializer.data).data

        return data, "Retrieve data successfully", status.HTTP_200_OK


class RentalListFromUserAPIView(APIView):
    @api_decorator
    def get(self, request, idkh):
        user = User.objects.get(id=pk)
        posts = BaiTimViec.objects.filter(user=user).order_by('-created_at')

        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(posts, request)
        serializer = BaiTimViecsSerializer(result_page, many=True, context={'request': request})
        data = paginator.get_paginated_response(serializer.data).data

        return data, "Retrieve data successfully", status.HTTP_200_OK

class RentalListByKhachHangAPIView(APIView):
    @api_decorator
    def get(self, request):
        posts = BaiTimViec.objects.filter().order_by('-ngay_khoi_tao    ')

        serializer = RentalDetailSerializer(posts, many=True)
        data = serializer.data
        return data, "Retrieve data successfully", status.HTTP_200_OK

    @api_decorator
    def get(self, request,idkh):
        khachhang = KhachHang.objects.get(idkh=idkh)
        posts = BaiTimViec.objects.filter(khach_hang_id=khachhang).order_by('-ngay_khoi_tao')
        serializer = RentalDetailSerializer(posts, many=True)
        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK

class RentalApproveAPIView(APIView):
    @api_decorator
    def get(self, request, pk):
        baitimviec = BaiTimViec.objects.get(id=pk)
        baitimviec.duyet_bai()
        serializer = RentalDetailSerializer(baitimviec)
        # Gọi phương thức duyet_bai mà không truyền tham số
        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK


class RentalRefuseAPIView(APIView):
    @api_decorator
    def post(self, request, pk):
        baitimviec = BaiTimViec.objects.get(id=pk)
        ly_do = request.data.get("reason")
        baitimviec.tu_choi(ly_do)
        serializer = RentalDetailSerializer(baitimviec)
        # Gọi phương thức duyet_bai mà không truyền tham số
        return serializer.data, "Retrieve data successfully", status.HTTP_200_OK


class RentalByMultilFieldAPIView(APIView):
    @api_decorator
    def get(self,request):
        pass