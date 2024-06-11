import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_ROOT } from '../../config-global';

import {useState, useEffect, useCallback} from "react"

const API_NOTI_DETAIL= API_ROOT + "notication/noti/detail/"




const ChiTietTB = ({ route,navigation }) => {
  const { title, content,noti } = route.params;
  const [notification, setNotification] = useState([]);
  const getAllNoti = useCallback(async () => {
    try {
      const response = await axios.get(API_NOTI_DETAIL + `${noti.id}/`);
      const data = response.data.data;
      setNotification(data);
    } catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllNoti();
    });

    return unsubscribe;
  }, [navigation, getAllNoti]);




  return (
    <View style={styles.container}>
      <Text style={{textAlign:"center",fontSize:30}}>Chi tiết thông báo</Text>
      <Text style={styles.title}>Tiêu đề: {notification.tieu_de}</Text>
      <Text style={styles.content}>{notification.noi_dung}</Text>
      <Text style={styles.content}>Thời gian {noti.ngay_tao}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  content: {
    fontSize: 16,
  },
});

export default ChiTietTB;
