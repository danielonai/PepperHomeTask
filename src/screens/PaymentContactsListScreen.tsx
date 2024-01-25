import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useReduxDispatch, useReduxSelector } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContactsList } from "../redux/contactsSlice";
import getContactsList from "../api/getContactsList";
import { Contact } from "../types/contact";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { PaymentStackParamList } from "../types/navigation";
import { User } from "../types/user";

type PaymentContactsListScreenRouteProp = RouteProp<PaymentStackParamList, 'PaymentContactsList'>;
type PaymentContactsListScreenNavigationProp = StackNavigationProp<PaymentStackParamList, 'PaymentContactsList'>;

type PaymentContactsListScreenProps = {
  route: PaymentContactsListScreenRouteProp;
  navigation: PaymentContactsListScreenNavigationProp;
}

const PaymentContactsListScreen: React.FC<PaymentContactsListScreenProps> = ({ navigation }) => {
	const [searchText, setSearchText] = useState("");
	const [filteredContacts, setFilteredContacts] = useState<Contact[] | []>([]);

	const dispatch = useReduxDispatch();

	const contactsData = useReduxSelector((state) => state.contacts.contactsList);
  
	useEffect(() => {
    if (contactsData.length === 0) {
      setContactsListToStore();
		}
		setFilteredContacts(contactsData);
	}, [contactsData]);
  
  useEffect(() => {
    const filtered = contactsData.filter((contact) => contact.name.includes(searchText));
    setFilteredContacts(filtered);
  }, [searchText]);

	const setContactsListToStore = async () => {
		const storageContactsList = await AsyncStorage.getItem("pepper-contacts-list");
		if (storageContactsList) {
			dispatch(setContactsList(JSON.parse(storageContactsList)));
			setFilteredContacts(JSON.parse(storageContactsList));
		} else {
			const ListFromAPI = await getContactsList();
			await AsyncStorage.setItem("pepper-contacts-list", JSON.stringify(ListFromAPI));
			dispatch(setContactsList(ListFromAPI));
			setFilteredContacts(ListFromAPI);
		}
	};

	const handleCreateNewContact = () => {
		navigation.navigate("PaymentCreateContact");
	};
  
	const handleContactClick = (contact: Contact) => {
    navigation.navigate('PaymentAmount', { contact})
	};
  
    const renderItem = ({ item }: { item: Contact }) => {
      return (
        <TouchableOpacity style={styles.contactItem} onPress={() => handleContactClick(item)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );
    };

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.searchInput}
				placeholder="חפש שם מוטב"
				value={searchText}
				onChangeText={(text) => setSearchText(text)}
			/>

			<FlatList data={filteredContacts} renderItem={renderItem} keyExtractor={(item) => item.acount} />

			<TouchableOpacity style={styles.createButton} onPress={handleCreateNewContact}>
				<Text style={styles.createButtonText}>יצירת מוטב חדש</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	searchInput: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		borderRadius: 5,
		marginBottom: 16,
		padding: 10,
	},
	contactItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
	},
	createButton: {
		backgroundColor: "#FF0D79",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
	},
	createButtonText: {
		color: "#fff",
		fontSize: 16,
	},
});

export default PaymentContactsListScreen;
