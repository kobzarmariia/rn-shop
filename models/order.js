import moment from 'moment';

class Order {
	constructor(id, items, totalAmount, date) {
		this.id = id;
		this.items = items;
		this.totalAmount = totalAmount;
		this.date = date;
	}

	get readebleDate() {
		// return this.date.toLocaleDateString('en-EN', {
		// 	year: 'numeric',
		// 	mounth: 'long',
		// 	day: 'numeric',
		// 	hour: '2-digit',
		// 	minute: '2-digit',
		// });
		return moment(this.date).format('MMMM Do YYYY, hh:mm');
	}
}

export default Order;
