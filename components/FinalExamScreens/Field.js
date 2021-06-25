import React from "react";
import {
  Linking,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Octicons } from "@expo/vector-icons";

function Field({ name, onPress }) {
  dialCall = (number) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <TouchableOpacity
      style={styles.field}
      onPress={() => {
        if (name === "CONTACT US") {
          dialCall(123456789);
        } else {
          onPress();
        }
      }}
    >
      <Octicons name="primitive-dot" size={24} color="green" />
      <Text style={{ color: "black", paddingLeft: 10 }}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    padding: 15,
  },
});

export default Field;
