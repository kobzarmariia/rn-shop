import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import Card from '../../components/UI/Card';

const CartScreen = props => {
	const cartTotalAmount = useSelector(state => state.cart.totalAmount);
	const dispatch = useDispatch();

	const removeCartItemHandler = productId => {
		dispatch(removeFromCart(productId));
	};

	const cartItems = useSelector(state => {
		const transformCartItems = [];
		for (const key in state.cart.items) {
			transformCartItems.push({
				productId: key,
				productTitle: state.cart.items[key].productTitle,
				productPrice: state.cart.items[key].productPrice,
				quantity: state.cart.items[key].quantity,
				sum: state.cart.items[key].sum,
			});
		}
		return transformCartItems.sort((a, b) => a.quantity < b.quantity);
	});

	return (
		<View style={styles.screen}>
			<Card style={styles.summary}>
				<Text style={styles.summaryText}>
					Total:{' '}
					<Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
				</Text>
				<Button
					color={Colors.accent}
					title="Order Now"
					disabled={cartItems.length === 0}
					onPress={() => {
						console.log('cartItems' + cartItems[0].sum);
						console.log('cartTotalAmount' + cartTotalAmount);
						dispatch(addOrder(cartItems, cartTotalAmount));
					}}
				/>
			</Card>
			<FlatList
				data={cartItems}
				keyExtractor={item => item.productId}
				renderItem={itemData => (
					<CartItem
						quantity={itemData.item.quantity}
						title={itemData.item.productTitle}
						amount={itemData.item.sum}
						deletable
						onRemove={() => removeCartItemHandler(itemData.item.productId)}
					/>
				)}
			/>
		</View>
	);
};

CartScreen.navigationOption = {
	headerTitle: 'Your Cart',
};

const styles = StyleSheet.create({
	screen: {
		margin: 20,
	},
	summary: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 20,
		padding: 10,
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		borderRadius: 10,
		backgroundColor: 'white',
	},
	summaryText: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
	},
	amount: {
		color: Colors.primary,
	},
});

export default CartScreen;
