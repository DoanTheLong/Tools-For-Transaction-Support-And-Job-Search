import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { PRIMARY } from "../assets/style/style-global";

export default function OTP({ navigation }) {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [isLastDigitEntered, setIsLastDigitEntered] = useState(false);
  const [email, setEmail] = useState(""); // State for storing email address
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Move to next input field
      if (value.length === 1 && index < otp.length - 1) {
        inputsRef.current[index + 1].focus();
      }
    }

    // Check if last digit is entered
    if (index === otp.length - 1 && value.length === 1) {
      setIsLastDigitEntered(true);
    } else {
      setIsLastDigitEntered(false);
    }
  };

  const handleLastDigitSubmit = () => {
    Keyboard.dismiss(); // Dismiss keyboard after entering last digit
  };

  const handleSendOTP = () => {
    // Implement logic to send OTP to the entered email address
    console.log("Sending OTP to:", email);
    // Clear OTP fields after sending
    setOTP(["", "", "", "", "", ""]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.img1}
              source={require("../assets/imgs/Otp.png")}
            />
          </View>
          <View style={styles.body}>
            <Text style={styles.lbl1}>
              Nhập mã OTP được gửi về email của bạn:
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <TextInput
                style={{
                  paddingLeft: 10,
                  fontSize: 20,
                  width: "70%",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "gray",
                }}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                secureTextEntry={true}
              />

              <TouchableOpacity style={styles.sendOTPButton} onPress={handleSendOTP}>
                <Text style={{ fontSize: 16 }}>Gửi mã OTP</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              {otp.map((value, index) => (
                <View key={index} style={styles.pnl1}>
                  <TextInput
                    ref={(ref) => (inputsRef.current[index] = ref)}
                    style={styles.input}
                    value={value}
                    onChangeText={(text) => handleChange(index, text)}
                    keyboardType="numeric"
                    maxLength={1}
                    onSubmitEditing={
                      index === otp.length - 1 ? handleLastDigitSubmit : undefined
                    }
                  />
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.verifyButton}>
              <Text style={styles.txt2}>Xác minh</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  img1: {
    height: "75%",
  },
  body: {
    flex: 0.6,
    width: "80%",
    marginLeft: "10%",
    marginTop: 5,
  },
  lbl1: {
    fontSize: 15,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  pnl1: {
    width: "13%",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    textAlign: "center",
  },
  verifyButton: {
    marginTop: 15,
    backgroundColor: "#2baf66",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  txt2: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  sendOTPButton: {
    backgroundColor: "#2baf66",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
