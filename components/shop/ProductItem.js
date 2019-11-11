import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from 'react-native';

import Card from '../UI/Card';

const ProductItem = ({ image, title, price, onSelect, children }) => {
	const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

	return (
		<Card style={styles.product}>
			<View style={styles.touchable}>
				<Touchable onPress={onSelect}>
					<View>
						<View style={styles.imageContainer}>
							<Image source={{ uri: image }} style={styles.image} />
						</View>
						<View style={styles.details}>
							<Text style={styles.title}>{title}</Text>
							<Text style={styles.price}>${price}</Text>
						</View>
						<View style={styles.actions}>{children}</View>
					</View>
				</Touchable>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	product: {
		height: 300,
		margin: 20,
	},
	touchable: {
		overflow: 'hidden',
		borderRadius: 10,
	},
	imageContainer: {
		width: '100%',
		height: '60%',
		borderTopLeftRadius: 10,
		borderTopLeftRadius: 10,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	details: {
		alignItems: 'center',
		height: '17%',
		padding: 10,
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
		marginVertical: 4,
	},
	price: {
		fontFamily: 'open-sans',
		fontSize: 14,
		color: '#888',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '23%',
		paddingHorizontal: 20,
	},
});

export default ProductItem;
