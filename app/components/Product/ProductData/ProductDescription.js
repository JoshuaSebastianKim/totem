import React from 'react';
import PropTypes from 'prop-types';
import { DetailIcon } from '../../UI/Icons';
import styles from './ProductDescription.scss';

const ProductDescription = ({ descriptionHTML }) => (
	<div className={styles.container}>
		<div className={styles.descriptionHead}>
			<DetailIcon className={styles.descriptionHeadIcon} />

			<span className={styles.descriptionHeadText}>
				Sobre el producto
			</span>
		</div>

		<div
			className={styles.descriptionBody}
			dangerouslySetInnerHTML={{ __html: descriptionHTML }}
		/>
	</div>
);

ProductDescription.propTypes = {
	descriptionHTML: PropTypes.string.isRequired
};

export default ProductDescription;
