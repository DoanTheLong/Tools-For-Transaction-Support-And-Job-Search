import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { PRIMARY } from "../../assets/style/style-global";
import { Button } from "react-native";
import { TouchableOpacity } from "react-native";

export default function ChiTietGiaoDich({ route }) {
  const { item } = route.params;
  return (
    <SafeAreaView>
      <View style={styles.orderItem}>
        <Text style={styles.serviceName}>
          Thời gian: {item.thoi_gian_lam_viec}
        </Text>
        <Text>Ghi chú: {item.ghi_chu}</Text>
        <Text>Giá: {item.gia_tri} đồng</Text>
        <Text>
          Trạng thái: 
          <Text
            style={{
              color: item.trang_thai == "Chờ xác nhận" ? "red" : "green",
            }}
          >
            {item.trang_thai}
          </Text>
        </Text>
        <Text> Địa chỉ làm việc: {item.dia_chi_lam_viec}</Text>
        <Text> Hình thức thanh toán: {item.hinh_thuc_thanh_toan}</Text>
        <Text style={{ textAlign: "center", fontSize: 30 }}>
          {" "}
          Thông tin thực hiện
        </Text>
        {item.khach_hang_thue && (
          <View>
            <Text style={{ textAlign: "center", fontSize:15,fontWeight:700,}}>Thông tin phía khách hàng</Text>
            <Text>Khách hàng thuê : {item.khach_hang_thue.ho_ten}</Text>
            <Text>Số điện thoại: {item.khach_hang_thue.phone_number}</Text>
          </View>
        )}

        {item.nhan_vien_thuc_hien && <View>
          <Text style={{ textAlign: "center", fontSize:15,fontWeight:700,}}>Thông tin nhan viên thực hiện</Text>

          <Text>Khách hàng thuê : {item.nhan_vien_thuc_hien.ho_ten}</Text>
            <Text>Số điện thoại: {item.nhan_vien_thuc_hien.phone_number}</Text>
          </View>}
      </View>
      <TouchableOpacity>
        <View
          style={{ backgroundColor: "red", color: "white", borderRadius: 10 }}
        >
          <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>
            Hủy giao dịch này
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    width: "90%",
    marginTop: 50,
    height: "90%",
    marginLeft: "5%",
  },
  messageContainer: {
    width: "90%",
    marginLeft: "5%",
    height: 50,
    marginTop: "5%",
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
  },
  messageText: {
    marginLeft: "5%",
    marginRight: "5%",
  },
  linkText: {
    color: "blue",
  },
  orderItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PRIMARY.main,
    margin: 2,
  },
  serviceName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
