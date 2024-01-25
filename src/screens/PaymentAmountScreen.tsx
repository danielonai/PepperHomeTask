import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button } from "react-native";
import { useReduxDispatch, useReduxSelector } from "../redux/store";
import { setUserToStore } from "../redux/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentStackParamList, RootStackParamList } from "../types/navigation";

type PaymentAmountScreenRouteProp = RouteProp<PaymentStackParamList, "PaymentAmount">;

type PaymentAmountScreenProps = {
	navigation: CompositeNavigationProp<
		StackNavigationProp<PaymentStackParamList, "PaymentCreateContact">,
		StackNavigationProp<RootStackParamList>
	>;
	route: PaymentAmountScreenRouteProp;
};

const PaymentAmountScreen: React.FC<PaymentAmountScreenProps> = ({ route, navigation }) => {
	const [amount, setAmount] = useState(0);
	const [isDisabled, setIsDisabled] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	
	const user = useReduxSelector((state) => state.user.user);

	const {  contact } = route.params;
	const dispatch = useReduxDispatch();

	const onConfirmTransfer = async () => {
		const random = Math.floor(Math.random() * 10);
		if (random > 6) {
			navigation.navigate("Error", { title: "שגיאה בהעברת התשלום" });
		} else {
			const newUser = {
				username: user!.username,
				acount: user!.acount,
				balance: user!.balance - amount,
			};
			dispatch(setUserToStore(newUser));
			await AsyncStorage.setItem("pepper-user", JSON.stringify(newUser));
			setIsModalVisible(true);
		}
	};

	const checkAmount = (val: string) => {
		const parsedValue = val === "" ? 0 : parseInt(val);
		setAmount(parsedValue);

		if (parsedValue > user!.balance || parsedValue <= 0) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	};

	return (
		<View style={styles.container}>
			<Modal
				animationType="none"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={() => {
					setIsModalVisible(!isModalVisible);
				}}
			>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>ההעברה בוצעה בהצלחה!</Text>
					<TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate("Home")}>
						<Text style={styles.confirmButtonText}>חזרה למסך הראשי</Text>
					</TouchableOpacity>
				</View>
			</Modal>
			<View style={styles.detailsContainer}>
				<View style={styles.details}>
					<Text style={styles.detailsTitle}>העברה מחשבון</Text>
					<Text style={styles.detailsText}>{user!.username} :שם</Text>
					<Text style={styles.detailsText}>{user!.acount} :מספר חשבון</Text>
				</View>

				<View style={styles.details}>
					<Text style={styles.detailsTitle}>אל המוטב</Text>
					<Text style={styles.detailsText}> שם: {contact.name}</Text>
					<Text style={styles.detailsText}>מספר חשבון: {contact.acount}</Text>
				</View>
			</View>
			<Text style={styles.label}>סכום העברה:</Text>
			{isDisabled && amount > user!.balance && (
				<Text style={styles.warning}>
					סכום העברה גבוה מהיתרה בחשבון. אנא בחר בסכום נמוך מהיתרה או שווה לה.
				</Text>
			)}
			<TextInput
				style={styles.input}
				placeholder="בחר סכום העברה"
				value={amount ? amount.toString() : ""}
				onChangeText={(text) => checkAmount(text)}
				keyboardType="numeric"
			/>

			<TouchableOpacity style={styles.confirmButton} disabled={isDisabled} onPress={onConfirmTransfer}>
				<Text style={styles.confirmButtonText}>אישור העברה</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	modalContainer: {
		display: "flex",
		width: 300,
		height: 200,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		position: "absolute",
		top: "30%",
		left: "10%",
		borderWidth: 1,
		borderColor: "black",
	},
	modalTitle: {
		fontSize: 20,
		color: "black",
		marginBottom: 50,
		marginTop: 30,
		fontWeight: "600",
	},
	modalText: {
		fontSize: 16,
		color: "black",
		textAlign: "center",
	},
	detailsContainer: {
		display: "flex",
		flexDirection: "row-reverse",
		justifyContent: "space-between",
		marginVertical: 40,
	},
	details: {
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-end",
	},
	detailsTitle: {
		fontSize: 20,
		marginBottom: 20,
		textDecorationLine: "underline",
	},
	detailsText: {
		fontSize: 14,
		marginVertical: 10,
	},
	label: {
		fontSize: 18,
		marginTop: 16,
		marginBottom: 5,
	},
	warning: {
		fontSize: 14,
		color: "red",
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

export default PaymentAmountScreen;
