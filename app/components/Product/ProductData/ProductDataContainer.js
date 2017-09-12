import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { UnmountClosed } from 'react-collapse';
import ProductDescription from './ProductDescription';
import ProductSpecifications from './ProductSpecifications';
import placeholderData from './placeholderData.json';
import styles from './ProductDataContainer.scss';

class ProductDataContainer extends PureComponent {
	static propTypes = {
		product: PropTypes.object.isRequired,
		isSpecificationsActive: PropTypes.bool,
		onToggleSpecifications: PropTypes.func
	}

	static defaultProps = {
		isSpecificationsActive: false,
		onToggleSpecifications: () => null
	}

	getSpecifications = (product) => {
		const { allSpecifications } = product;

		return allSpecifications ?
			allSpecifications.map(spec => ({
				key: spec,
				value: product[spec].join(', ')
			}))
			: [];
	}

	render() {
		const { product, isSpecificationsActive, onToggleSpecifications } = this.props;
		const specifications = this.getSpecifications(placeholderData);

		return (
			<div className={styles.container}>
				{/* PRODUCT DESCRIPTION */}
				<UnmountClosed isOpened={!isSpecificationsActive}>
					<ProductDescription descriptionHTML={product.description} />
				</UnmountClosed>

				{/* PRODUCT SPECIFICATIONS */}
				<UnmountClosed isOpened={isSpecificationsActive}>
					<ProductSpecifications specifications={specifications} onToggleSpecifications={onToggleSpecifications} />
				</UnmountClosed>
			</div>
		);
	}

}

export default ProductDataContainer;
