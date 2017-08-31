import React from 'react';
import { string, element } from 'prop-types';
import styles from './Departments.scss';

const Department = ({ id, name, bannerSrc, Icon }) => (
	<div className={styles.department}>
		<img
			src={bannerSrc}
			alt={name}
			className={styles.departmentBanner}
		/>

		<div className={styles.departmentGradient} />

		<div className={styles.departmentLabel}>
			<Icon className={styles.departmentLabelIcon} />

			<span className={styles.departmentLabelName}>
				{name}
			</span>
		</div>
	</div>
);

Department.propTypes = {
	id: string.isRequired,
	name: string.isRequired,
	bannerSrc: string.isRequired,
	Icon: element.isRequired
};

export default Department;
