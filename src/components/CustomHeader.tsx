import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useReduxSelector } from '../redux/store';

const Header: React.FC = () => {
  const navigation = useNavigation();
  const userAccount = useReduxSelector((state) => state!.user!.user!.acount);

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{`מספר חשבון: ${userAccount}`}</Text>
      <TouchableOpacity onPress={handleBackButtonPress} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'< חזור'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 60,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 20,
  },
  backButton: {
    marginLeft: 30,
  },
  backButtonText: {
    color: '#FF0D79',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
