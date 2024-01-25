import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PaymentContactsListScreen from "../screens/PaymentContactsListScreen";
import PaymentCreateContactScreen from "../screens/PaymentCreateContactScreen";
import PaymentAmountScreen from "../screens/PaymentAmountScreen";
import { PaymentStackParamList } from "../types/navigation";
import Header from "../components/CustomHeader";

const PaymentStack = createNativeStackNavigator<PaymentStackParamList>();

const PaymentStackNavigator = () => {
  return (
    <PaymentStack.Navigator
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <PaymentStack.Screen
        name="PaymentContactsList"
        component={PaymentContactsListScreen}
      />
      <PaymentStack.Screen
        name="PaymentCreateContact"
        component={PaymentCreateContactScreen}
      />
      <PaymentStack.Screen
        name="PaymentAmount"
        component={PaymentAmountScreen}
      />
    </PaymentStack.Navigator>
  );
};

export default PaymentStackNavigator;
