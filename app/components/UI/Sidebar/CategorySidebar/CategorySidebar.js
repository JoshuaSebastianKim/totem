import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import CategoryLink from './CategoryLink';
import { AireLibreIcon, CuidadoPersonalIcon, HogarIcon, LineaBlancaIcon, TecnologiaIcon } from '../../Icons';
import { Sidebar } from '../../';
import styles from './CategorySidebar.scss';

const departmentAssets = {
	'1': {
		icon: TecnologiaIcon
	},
	'2': {
		icon: LineaBlancaIcon
	},
	'3': {
		icon: CuidadoPersonalIcon
	},
	'4': {
		icon: HogarIcon
	},
	'5': {
		icon: AireLibreIcon
	}
};


const CategorySidebar = ({ categories, products }) => (
	<Motion
		defaultStyle={{ translateX: -100 }}
		style={{ translateX: spring(0) }}
	>
		{interpolatedStyles => (
			<Sidebar
				className={styles.sidebar}
				style={{ transform: `translateX(${interpolatedStyles.translateX}%)` }}
			>
				<div className={styles.divider} />

				<div className={styles.title}>CATEGORÍAS</div>

				<div className={styles.categories}>
					{categories.map(category => (
						<NavLink
							key={category.id}
							className={styles.categoryLink}
							activeClassName={styles.activeCategoryLink}
							isActive={(match, location) => {
								if (match) {
									return true;
								}

								if (/\/product\//.test(location.pathname)) {
									try {
										const productId = location.pathname.split('/')[2];
										const { categoriesIds } = products[productId];
										const parentCategoryId = categoriesIds[categoriesIds.length - 1].replace(/\//g, '');

										return category.children.some(subcategory => new RegExp(parentCategoryId).test(subcategory.id));
									} catch (e) {
										return false;
									}
								}

								return false;
							}}
							to={`/category/${category.id}`}
						>
							<CategoryLink
								Icon={departmentAssets[category.id].icon}
								name={category.name}
							/>
						</NavLink>
					))}
				</div>
			</Sidebar>
		)}
	</Motion>
);

CategorySidebar.propTypes = {
	categories: PropTypes.array.isRequired,
	products: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		categories: state.catalog.categoryTree,
		products: state.catalog.products
	};
}

export default connect(mapStateToProps)(CategorySidebar);
