import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CompareHeader from './CompareHeader';
import CompareItems from './CompareItems';
import CompareData from './CompareData';
import styles from './Compare.scss';

class Compare extends Component {

	render() {
		const { products } = this.props;

		if (products.length === 0) {
			return <Redirect to="/" />;
		}

		return (
			<div className={styles.container}>
				<CompareHeader />

				<CompareItems products={products} />

				<CompareData products={products} />
			</div>
		);
	}

}

export default Compare;
