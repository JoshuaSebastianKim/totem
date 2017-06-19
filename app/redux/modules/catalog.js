import categoryTree from '../../utils/categoryTree.json';
import { SEARCH_FULFILLED } from './search';

const initialState = {
	categoryTree,
	products: {}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SEARCH_FULFILLED:
			return {
				...state,
				products: action.payload.reduce((products, product) =>
					Object.assign(products, {
						[product.productId]: product
					})
				, state.products)
			};
		default:
			return state;
	}
}
