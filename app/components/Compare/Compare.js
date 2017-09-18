import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CompareHeader from './CompareHeader';
import CompareItems from './CompareItems';
import CompareData from './CompareData';
import styles from './Compare.scss';

type Props = {
	products: Array<any>,
	lastLocation: string,
	onRemoveCompareItem: () => void
};

class Compare extends Component {
	props: Props

	render() {
		const { products, lastLocation, onRemoveCompareItem } = this.props;

		if (products.length === 0) {
			return <Redirect to={lastLocation} />;
		}

		return (
			<div className={styles.container}>
				<CompareHeader lastLocation={lastLocation} />

				<CompareItems
					products={products}
					onRemoveCompareItem={onRemoveCompareItem}
					lastLocation={lastLocation}
				/>

				<CompareData products={products} />
			</div>
		);
	}

}

export default Compare;
