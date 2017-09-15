export type OrderItem = {
	additionalInfo: {
		brandName: string
	},
	id: string,
	imageUrl: string,
	name: string,
	listPrice: number,
	price: number,
	sellingPrice: number,
	quantity: number
};

export type Totalizer = {
	id: string,
	name: string,
	value: number
};

export type OrderForm = {
	items: Array<OrderItem>,
	totalizers: Array<Totalizer>,
	value: number
};
