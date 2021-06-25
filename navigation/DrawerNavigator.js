import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AppForm from "../components/FinalExamScreens/AppForm";
import Blank from "../components/FinalExamScreens/Blank";

const Drawer = createDrawerNavigator();

function DrawerNavigator(props) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={AppForm} />
      <Drawer.Screen name="Check" component={Blank} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
