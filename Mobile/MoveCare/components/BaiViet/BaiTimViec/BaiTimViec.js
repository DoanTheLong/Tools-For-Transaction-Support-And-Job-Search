import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { Icon, MD3Colors } from "react-native-paper";
import { PRIMARY } from "../../../assets/style/style-global";

export default function BaiTimViec({ baidang, show }) {

  show == true ? show = true : show = baidang.da_duyet




 
  return (
    show ? <View
    key={baidang.id}
    style={{
      padding: 15,
      flexDirection: "row",
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 10, // Độ cong của border
      margin: 5,
    }}
  >
    <Image
      source={{uri: baidang.khach_hang_id.anh_dai_dien}} // Đường dẫn đến hình ảnh
      style={styles.avatar} // Kích thước của hình ảnh
    />
    <View
      style={{
        flex: 1,
        marginRight: 10,
      }}
    >
      <Text
        style={{
          color: PRIMARY.main,
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
       {baidang.tieu_de}
      </Text>
 
      <View
        style={{
          height: 1,
          backgroundColor: "black",
          marginBottom: 5,
        }}
      />
      <Text style={styles.title}>Người đăng: {baidang.khach_hang_id.ho_ten}</Text>
      <View>
        <Text
          style={{
            color: "black",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Mô tả: {baidang.mo_ta_ngan}
        </Text>
      </View>
      <View>
        <Text>Địa chỉ: {baidang.dia_chi}</Text>
      </View>
      {baidang.da_duyet == 0 &&
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text
              style={{
                color: "black",
                fontSize: 12,
                marginRight: 10,
              }}
            >
              Đang chờ kiểm duyệt:
            </Text>

            <Icon
              source="alarm-snooze"
              color={PRIMARY.main}
              size={20}
            />
          </View>
        }
        {baidang.da_duyet == 1 &&
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text
              style={{
                color: "black",
                fontSize: 12,
                marginRight: 10,
              }}
            >
              Đã được kiểm duyệt:
            </Text>

            <Icon
              source="check-outline"
              color={PRIMARY.main}
              size={20}
            />
          </View>
        }
        {baidang.da_duyet == 2 &&
          <View style={{ flexDirection: "row", marginTop: 5 }}>
            <Text
              style={{
                color: "black",
                fontSize: 12,
                marginRight: 10,
              }}
            >
              Từ chối với lý do: <Text style = {{color:"red"}}>{baidang.ly_do}</Text>
            </Text>
            
            <Icon
              source="comment-remove"
              color="red"
              size={20}
            />
          </View>
        }
    </View>
  </View>
  : null
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2baf66",
  },
  title: {
    color: "black",
    fontSize: 15,
    fontWeight: "500",
  },
  avatar: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 60 // Sửa thành số
  },
});
