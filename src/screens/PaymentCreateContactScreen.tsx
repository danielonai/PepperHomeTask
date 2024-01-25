import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useReduxDispatch, useReduxSelector } from "../redux/store";
import { Contact } from "../types/contact";
import { setContactsList } from "../redux/contactsSlice";
import { CompositeNavigationProp } from "@react-navigation/native";
import { PaymentStackParamList, RootStackParamList } from "../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

type PaymentCreateContactScreenProps = {
	navigation:  CompositeNavigationProp<
    StackNavigationProp<PaymentStackParamList, 'PaymentCreateContact'>,
    StackNavigationProp<RootStackParamList>
	>
  };

const PaymentCreateContactScreen: React.FC<PaymentCreateContactScreenProps> = ({ navigation }) => {
	const [name, setName] = useState("");
	const [accountNumber, setAccountNumber] = useState("");

	const contactsList: Contact[] = [...useReduxSelector((state) => state.contacts.contactsList)];
	const dispatch = useReduxDispatch();

	const handleConfirm = async () => {
		const random = Math.floor(Math.random() * 10);
		if (random > 6) {
			navigation.navigate('Error', {title: 'שגיאה ביצירת מוטב חדש'})
		} else {
			contactsList.push({ name: name, acount: accountNumber });
			dispatch(setContactsList(contactsList));
			await AsyncStorage.setItem("pepper-contacts-list", JSON.stringify(contactsList));
			navigation.navigate("PaymentContactsList");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>שם המוטב</Text>
			<TextInput
				style={styles.input}
				placeholder="שם המוטב"
				value={name}
				onChangeText={(text) => setName(text)}
			/>

			<Text style={styles.label}>מספר חשבון</Text>
			<TextInput
				style={styles.input}
				placeholder="מספר חשבון"
				value={accountNumber}
				onChangeText={(text) => setAccountNumber(text)}
				keyboardType="numeric"
			/>

			<TouchableOpacity style={styles.confirmButton} disabled={name.length===0 || accountNumber.length === 0} onPress={handleConfirm}>
				<Text style={styles.confirmButtonText}>אישור</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	label: {
		fontSize: 18,
		marginBottom: 8,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 16,
		padding: 10,
	},
	confirmButton: {
		backgroundColor: "#FF0D79",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
	},
	confirmButtonText: {
		color: "#fff",
		fontSize: 16,
	},
});

export default PaymentCreateContactScreen;
