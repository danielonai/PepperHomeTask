import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useReduxSelector } from "../redux/store";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

type HomeScreenProps = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const user = useReduxSelector((state) => state.user.user);

  const handleTransferPayment = () => {
    navigation.navigate('PaymentStack', { screen: 'PaymentContactsList' });
  };

  return (
    <>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../../assets/PEPPERLogo.png")}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{`שלום ${user?.username}`}</Text>

        <Text style={styles.balanceTitle}>{`יתרה: ₪${user?.balance}`}</Text>

        <TouchableOpacity style={styles.button} onPress={handleTransferPayment}>
          <Text style={styles.buttonText}>העברת תשלום</Text>
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
    position: 'absolute',
    top: 80,
    left: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  balanceTitle: {
    fontSize: 20,
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

export default HomeScreen;
