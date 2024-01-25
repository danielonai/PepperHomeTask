import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useReduxDispatch } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUser from "../api/getUser";
import { setUserToStore } from "../redux/userSlice";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

type AuthScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type AuthScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

type AuthScreenProps = {
  route: AuthScreenRouteProp;
  navigation: AuthScreenNavigationProp;
};

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useReduxDispatch();

  const handleLogin = async () => {
    if (username.length === 0 || password.length === 0) {
      return Alert.alert('שגיאה', 'אנא מלא את כל השדות')
    }
    const userFromAPI = await getUser();
    if (userFromAPI.username === username) {
      dispatch(setUserToStore(userFromAPI));
      AsyncStorage.setItem('pepper-user', JSON.stringify(userFromAPI));
      navigation.navigate('Home');
    } else {
      navigation.navigate('Error', { title: 'שם משתמש או סיסמה שגויים' });
    }
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  return (
    <>
      <Image style={styles.logo} resizeMode="contain" source={require("../../assets/PEPPERLogo.png")} />

      <View style={styles.container}>
        <Text style={styles.title}>שלום משתמש</Text>

        <TextInput
          style={styles.input}
          placeholder="שם משתמש"
          placeholderTextColor="#666"
          value={username}
          onChangeText={handleUsernameChange}
        />

        <TextInput
          style={styles.input}
          placeholder="סיסמה"
          placeholderTextColor="#666"
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>התחבר</Text>
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
    textAlign: "right",
    padding: 20,
  },
  logo: {
    width: 300,
    height: 50,
    position: 'absolute',
    top: 80,
    left: 40
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#FF0D79",
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    width: "100%",
    textAlign: "right",
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

export default AuthScreen;
