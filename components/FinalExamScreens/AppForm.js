import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import Field from "./Field";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextStyle from "./TextStyle";
import { useState } from "react";
import axios from "axios";
import { set } from "react-native-reanimated";

// import Data from "./Data";

function AppForm({ navigation }) {
  const [home, setHome] = useState("HOME");
  let data = [
    {
      id: 0,
      name: home,
    },
    {
      id: 1,
      name: "PRODUCTS",
    },
    {
      id: 2,
      name: "COACHING",
    },
    {
      id: 3,
      name: "TFP RECOMMENDATION",
    },
    {
      id: 4,
      name: "SALE",
    },
    {
      id: 5,
      name: "ORDERS",
    },
    {
      id: 6,
      name: "FAQ",
    },
    {
      id: 7,
      name: "BLOG",
    },
    {
      id: 8,
      name: "CONTACT US",
    },
    {
      id: 9,
      name: "ADDRESSES & DETAILS",
    },
  ];
  const width = "100%";
  const iconName = "home-search-outline";
  //   const [data, setData] = useState(data);
  const [searchData, setSearchData] = useState(data);
  const [disable, setDisable] = useState(true);
  const [up, setUp] = useState("");
  const fetchDataFromAPI = () => {
    const headers = {
      Authorization: "Bearer ",
      "content-type": "application/json",
    };
    axios
      .get("https://thefoodpharmacy.pk/api/auth/status/10", { headers })
      .then((response) => {
        if (response.data["status"] === "okay") {
          console.log("Data is =", response.data["response"]["message"]);
          setDisable(true);
        } else if (response.data["status"] === "error") {
          setDisable(false);
          console.log("Error is =", response.data["response"]["message"]);
        }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  //   useEffect(() => {
  //     try {
  //       fetchDataFromAPI();
  //     } catch (error) {}
  //   }, []);

  const filtering = (text) => {
    if (text.length > 0)
      setSearchData(
        data.filter((m) => m.name.toLowerCase().includes(text.toLowerCase()))
      );
    else setSearchData(data);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const edit = () => {
    setModalVisible(!modalVisible);
  };

  const update = () => {
    setSearchData(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome
            onPress={() => navigation.openDrawer()}
            name="bars"
            size={24}
            color="white"
          />
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 50,
              marginLeft: 20,
              marginRight: 10,
            }}
            source={require("../../assets/icon.png")}
          />
          <Text style={{ padding: 2, color: "white", marginRight: 20 }}>
            Faizan Rasool
          </Text>
          {disable && (
            <TouchableOpacity
              style={{ padding: 5, backgroundColor: "white", borderRadius: 10 }}
              onPress={() => edit()}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "green",
                  marginLeft: 5,
                  marginRight: 5,
                }}
              >
                EDIT
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Ionicons
          style={{ alignSelf: "center" }}
          name="ellipsis-vertical"
          size={24}
          color="white"
        />
      </View>
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: "white",
          borderRadius: 10,
          alignSelf: "center",
        }}
        onPress={() => fetchDataFromAPI()}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "green",
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          Call API
        </Text>
      </TouchableOpacity>
      {modalVisible && (
        <>
          <TextInput
            style={styles.modalText}
            onChangeText={(text) => setHome(text)}
            placeholder={"Change Name of HOME Button"}
          />
          <TouchableOpacity
            style={{
              ...styles.openButton,
              backgroundColor: "green",
              alignSelf: "center",
            }}
            onPress={() => {
              setModalVisible(!modalVisible);
              update();
            }}
          >
            <Text
              style={{
                color: "white",
                alignSelf: "center",
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              Change
            </Text>
          </TouchableOpacity>
        </>
      )}
      <View style={[styles.container1]}>
        {iconName && (
          <MaterialCommunityIcons name={iconName} size={25} color={"black"} />
        )}

        <TextInput
          style={[TextStyle.text, { padding: 10, flex: 1 }]}
          onChangeText={(text) => filtering(text)}
          clearButtonMode="always"
        />
      </View>
      <FlatList
        data={searchData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Field
            name={item.name}
            onPress={() => navigation.navigate("Check")}
          />
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    paddingRight: 20,
    padding: 20,
    backgroundColor: "green",
    justifyContent: "space-between",
  },
  container1: {
    borderRadius: 25,
    alignItems: "center",
    paddingLeft: 10,
    flexDirection: "row",
    marginVertical: 10,
    borderWidth: 0.5,
    marginLeft: 10,
    marginRight: 10,
  },
  cancel: {
    position: "absolute",
    right: 10,
  },
  openButton: {
    backgroundColor: "green",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AppForm;
