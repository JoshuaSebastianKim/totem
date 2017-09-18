import React from 'react';
import { Link } from 'react-router-dom';
import { CloseButton, Button } from '../UI/Buttons';
import { PlusIcon } from '../UI/Icons';
import {
	ProductBrand,
	ProductDiscountPercent,
	ProductImage,
	ProductPrices,
	ProductName
} from '../Product/UI';
import { calculateDiscountPercent, getProductPrices } from '../Product/Utils';
import styles from './CompareItems.scss';

type Props = {
	products: Array<any>,
	lastLocation: string,
	onRemoveCompareItem: () => void
};

const CompareItems = ({ products, lastLocation, onRemoveCompareItem }: Props) => (
	<div className={styles.container}>
		{products.map(product => {
			const prices = getProductPrices(product);
			const bestPrice = prices.find(price => price.type === 'price');
			const listPrice = prices.find(price => price.type === 'list-price');
			const discount = (bestPrice && listPrice) ? calculateDiscountPercent(listPrice.value, bestPrice.value) : 0;

			return (
				<div key={product.productId} className={styles.product}>
					<CloseButton
						className={styles.remove}
						style={{
							position: 'absolute'
						}}
						iconSize={20}
						onClick={() => onRemoveCompareItem(product.productId)}
					/>

					<ProductDiscountPercent
						className={styles.discount}
						style={{ visibility: discount === 0 ? 'hidden' : 'visible' }}
						discount={discount}
					/>

					<ProductImage
						className={styles.image}
						src={product.items[0].images[0].imageUrl}
					/>

					<ProductBrand
						className={styles.brand}
						brand={product.brand}
					/>

					<ProductName
						className={styles.name}
						name={product.productName}
					/>

					<ProductPrices
						className={styles.prices}
						prices={prices.map(price => Object.assign(
							{}, price, { className: styles[price.type] }
						))}
					/>
				</div>
			);
		})}

		{products.length < 4 &&
			<div className={styles.addProduct}>
				<Link to={lastLocation} className={styles.link}>
					<Button className={styles.button}>
						<PlusIcon className={styles.icon} />
					</Button>
					<div className={styles.label}>
						Agregar
						<br />
						producto
					</div>
				</Link>
			</div>
		}
	</div>
);

export default CompareItems;
