import React from 'react';
import { string, func } from 'prop-types';
import styles from './CategoryLink.scss';

const CategoryLink = ({ Icon, name }) => (
	<div className={styles.category}>
		<Icon className={styles.categoryIcon} />

		<span className={styles.categoryLabel}>
			{name}
		</span>
	</div>
);

CategoryLink.propTypes = {
	Icon: func.isRequired,
	name: string.isRequired
};

export default CategoryLink;
