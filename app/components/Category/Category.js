import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProductList from '../Product/ProductList/ProductList';
import { CompareBar } from '../Compare';
import styles from './Category.scss';

class Category extends PureComponent {
	static propTypes = {
		categoryTree: PropTypes.object.isRequired,
		compareItems: PropTypes.array,
		onRemoveCompareItem: PropTypes.func,
		canCompare: PropTypes.bool
	}

	static defaultProps = {
		compareItems: [],
		onRemoveCompareItem: () => null,
		canCompare: false
	}

	constructor(props) {
		super(props);

		this.state = {
			config: {
				productsPerPage: 6
			},
			query: {
				category: `/${props.categoryTree.id.replace(/-/g, '/')}/`,
				range: {
					from: 0,
					to: 5
				}
			}
		};
	}

	render() {
		const { config, query } = this.state;
		const { categoryTree, compareItems, onRemoveCompareItem, canCompare } = this.props;

		return (
			<div className={styles.container}>
				<div className={styles.categoryName}>
					{categoryTree.name}
				</div>

				<div className={styles.filtersContainer} />

				<ProductList
					className={styles.productList}
					query={query}
					config={config}
					isCompareActive={compareItems.length > 0}
					canCompare={canCompare}
				/>

				<CompareBar items={compareItems} onRemoveItem={onRemoveCompareItem} />
			</div>
		);
	}
}

export default Category;
