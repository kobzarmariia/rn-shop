import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = ({ navigation }) => {
	const products = useSelector(state => state.products.availableProducts);
	const dispatch = useDispatch();

	const selectItemHandler = (id, title) => {
		navigation.navigate('ProductDetail', {
			productId: id,
			productTitle: title,
		});
	};

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

export default ProductsOverviewScreen;
