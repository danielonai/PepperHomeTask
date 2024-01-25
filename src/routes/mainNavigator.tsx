import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen";
import HomeScreen from "../screens/HomeScreen";
import ErrorScreen from "../screens/ErrorScreen";
import { useReduxDispatch, useReduxSelector } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserToStore } from "../redux/userSlice";
import PaymentStackNavigator from "./paymentNavigator";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const dispatch = useReduxDispatch();
  const user = useReduxSelector((state) => state.user.user);

  useEffect(() => {
    setUserFromStorage();
  }, []);

  const setUserFromStorage = async () => {
    const storageUser = await AsyncStorage.getItem("pepper-user");
    if (storageUser) {
      dispatch(setUserToStore(JSON.parse(storageUser!)));
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Home" component={AuthScreen} />
        )}
        <Stack.Screen name="PaymentStack" component={PaymentStackNavigator} />
        <Stack.Screen name="Error" component={ErrorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;


