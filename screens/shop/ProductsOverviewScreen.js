import React, { useState, useEffect, useCallback } from 'react';
import {
	FlatList,
	Platform,
	Button,
	ActivityIndicator,
	View,
	StyleSheet,
	Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import { isLoading } from 'expo-font';

const ProductsOverviewScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const products = useSelector(state => state.products.availableProducts);
	const dispatch = useDispatch();

	const loadProducts = useCallback(async () => {
		setError(null);
		setIsLoading(true);
		try {
			await dispatch(fetchProducts());
		} catch (err) {
			setError(err.message);
		}
		setIsLoading(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		const willFocusSub = navigation.addListener('willFocus', loadProducts);
		return () => {
			willFocusSub.remove();
		};
	}, [loadProducts]);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	const selectItemHandler = (id, title) => {
		navigation.navigate('ProductDetail', {
			productId: id,
			productTitle: title,
		});
	};

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurr ed!</Text>
				<Button title="Try again" onPress={loadProducts} color={Colors.primary} />
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	if (!isLoading && products.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No products found.</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={products}
			keyExtractor={item => item.id}
			renderItem={({ item }) => (
				<ProductItem
					image={item.imageUrl}
					title={item.title}
					price={item.price}
					onSelect={() => selectItemHandler(item.id, item.title)}
				>
					<Button
						title="View Details"
						color={Colors.primary}
						onPress={() => selectItemHandler(item.id, item.title)}
					/>
					<Button
						title="Add to Cart"
						color={Colors.primary}
						onPress={() => {
							dispatch(addToCart(item));
						}}
					/>
				</ProductItem>
			)}
		/>
	);
};

ProductsOverviewScreen.navigationOptions = navData => {
	return {
		headerTitle: 'All Products',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Cart"
					iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					onPress={() => {
						navData.navigation.navigate('Cart');
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProductsOverviewScreen;
