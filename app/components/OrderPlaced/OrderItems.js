import React from 'react';
import {
	ProductBrand,
	ProductDiscountPercent,
	ProductImage,
	ProductName
} from '../Product/UI';
import { Price } from '../UI';
import styles from './OrderItems.scss';

type Props = {
	items: Array<any>
};

const OrderItems = ({ items }: Props) => (
	<div className={styles.container}>
		<div className={styles.header}>
			<div className={`${styles.item} ${styles.productData}`}>
				Producto
			</div>
			<div className={`${styles.item} ${styles.price}`}>
				Precio
			</div>
			<div className={`${styles.item} ${styles.quantity}`}>
				Cantidad
			</div>
			<div className={`${styles.item} ${styles.total}`}>
				Subtotal
			</div>
		</div>

		<div className={styles.items}>
			{items.map(item => {
				const discount = Math.round(((item.listPrice - item.sellingPrice) * 100) / item.listPrice);

				return (
					<div key={item.id} className={styles.item}>
						<div className={styles.productData}>
							<ProductDiscountPercent
								className={styles.discount}
								style={{ visibility: discount === 0 ? 'hidden' : 'visible' }}
								discount={discount}
							/>

							<ProductImage
								className={styles.image}
								src={item.imageUrl}
							/>

							<div className={styles.info}>
								<ProductBrand className={styles.brand} brand={item.additionalInfo.brandName} />

								<ProductName className={styles.name} name={item.name} />
							</div>
						</div>

						<div className={styles.price}>
							{item.listPrice !== item.sellingPrice &&
								<div className={styles.listPrice}>
									<Price price={item.listPrice / 100} />
								</div>
							}

							<div className={styles.sellingPrice}>
								<Price price={item.sellingPrice / 100} />
							</div>
						</div>

						<div className={styles.quantity}>
							<div className={styles.amount}>
								{item.quantity}
							</div>
						</div>

						<div className={styles.total}>
							<Price price={(item.quantity * item.sellingPrice) / 100} />
						</div>
					</div>
				);
			})}
		</div>
	</div>
);

export default OrderItems;
