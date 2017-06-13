import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ProductList from '../Product/ProductList/ProductList';
import styles from './Category.scss';

class Category extends PureComponent {
	static propTypes = {
		categoryTree: PropTypes.object
	}

	state = {
		config: {
			productsPerPage: 6
		}
	}

	render() {
		const { config } = this.state;
		const { categoryTree } = this.props;
		const query = {
			category: `/${categoryTree.id}/`,
			range: {
				from: 0,
				to: 5
			}
		};
		console.log(categoryTree);

		return (
			<div className={styles.container}>
				<div className={styles.categoryName}>
					{categoryTree.name}
				</div>

				<ProductList query={query} config={config} />
			</div>
		);
	}
}

export default Category;
