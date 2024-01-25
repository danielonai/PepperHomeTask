import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { useReduxSelector } from "../redux/store";

type ErrorScreenRouteProp = RouteProp<RootStackParamList, 'Error'>;

interface ErrorScreenProps {
  title?: string;
  navigation: StackNavigationProp<any, any>;
  route: ErrorScreenRouteProp
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ route, navigation }) => {
  const { title } = route.params;
	const user = useReduxSelector((state) => state.user.user);

  return (
    <>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../../assets/PEPPERLogo.png")}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>אנא נסו שנית</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>  navigation.navigate("Home") }
        >
          <Text style={styles.buttonText}>{user ? 'חזרה לדף הבית' : 'חזרה'}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 300,
    height: 50,
    position: "absolute",
    top: 80,
    left: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: "#FF0D79",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF0D79",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ErrorScreen;
