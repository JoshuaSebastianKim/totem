import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Sidebar } from '../../';
import styles from './CategorySidebar.scss';

const CategorySidebar = ({ categories }) => (
	<Sidebar className={styles.sidebar}>
		<div className={styles.divider} />

		<div className={styles.title}>CATEGORÍAS</div>

		<div className={styles.categories}>
			{categories.map(category => (
				<NavLink
					key={category.id}
					className={styles.categoryLink}
					activeClassName={styles.activeCategoryLink}
					to={`/category/${category.id}`}
				>
					<div className={styles.categoryLinkIcon}>
						ICON
					</div>
					<div className={styles.categoryLinkLabel}>
						{category.name}
					</div>
				</NavLink>
			))}
		</div>
	</Sidebar>
);

CategorySidebar.propTypes = {
	categories: PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		categories: state.catalog.categoryTree
	};
}

export default connect(mapStateToProps)(CategorySidebar);
