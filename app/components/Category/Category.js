import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProductList from '../Product/ProductList/ProductList';
import { CompareBar } from '../Compare';
import styles from './Category.scss';

class Category extends PureComponent {
	static propTypes = {
		categoryTree: PropTypes.object.isRequired,
		compareItems: PropTypes.array,
		removeCompareItem: PropTypes.func
	}

	static defaultProps = {
		compareItems: [],
		removeCompareItem: () => null
	}

	constructor(props) {
		super(props);

		this.state = {
			config: {
				productsPerPage: 6
			},
			query: {
				category: `/${props.categoryTree.id}/`,
				range: {
					from: 0,
					to: 5
				}
			}
		};
	}

	render() {
		const { config, query } = this.state;
		const { categoryTree, compareItems, removeCompareItem } = this.props;

		return (
			<div className={styles.container}>
				<div className={styles.categoryName}>
					{categoryTree.name}
				</div>

				<ProductList query={query} config={config} canCompare />

				<CompareBar items={compareItems} handleRemoveItem={removeCompareItem} />
			</div>
		);
	}
}

export default Category;
