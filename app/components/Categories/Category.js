import React from 'react';
import { string } from 'prop-types';
import styles from './Category.scss';

const Category = ({ name, bannerSrc }) => (
	<div className={styles.category}>
		<img
			src={bannerSrc}
			alt={name}
			className={styles.categoryBanner}
		/>

		<div className={styles.categoryGradient} />

		<div className={styles.categoryLabel}>
			<span className={styles.categoryLabelName}>
				{name}
			</span>
		</div>
	</div>
);

Category.propTypes = {
	name: string.isRequired,
	bannerSrc: string.isRequired
};

export default Category;
