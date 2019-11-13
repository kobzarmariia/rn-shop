import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import { authenticate } from '../store/actions/auth';

const StartupScreen = props => {
	const dispatch = useDispatch();

	useEffect(() => {
		const tryLogin = async () => {
			const userData = await AsyncStorage.getItem('userData');
			if (!userData) {
				props.navigation.navigate('Auth');
				return;
			}
			const transformData = JSON.parse(userData);
			const { token, userId, expiryDate } = transformData;
			const expirationDate = new Date(expiryDate);

			if (expirationDate <= new Date() || !token || !userId) {
				props.navigation.navigate('Auth');
				return;
			}

			const expirationTime = expirationDate.getTime() - new Date().getTime();

			props.navigation.navigate('Shop');
			dispatch(authenticate(userId, token, expirationTime));
		};

		tryLogin();
	}, [dispatch]);

	return (
		<View style={styles.screen}>
			<ActivityIndicator size="large" color={Colors.primary} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default StartupScreen;
