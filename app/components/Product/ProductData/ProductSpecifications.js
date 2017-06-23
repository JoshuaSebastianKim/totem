import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon, SpecificationIcon } from '../../UI/Icons';
import styles from './ProductSpecifications.scss';

const ProductSpecifications = ({ onToggleSpecifications }) => (
	<div className={styles.container}>
		<div className={styles.specificationsHead}>
			<SpecificationIcon className={styles.specificationsHeadIcon} />

			<span className={styles.specificationsHeadText}>
				Especificaciones
			</span>

			<button
				className={styles.specificationsClose}
				onClick={onToggleSpecifications}
			>
				<CloseIcon />
			</button>
		</div>

		<div className={styles.specificationsBody}>
			SPECS
		</div>
	</div>
);

ProductSpecifications.propTypes = {
	onToggleSpecifications: PropTypes.func
};

ProductSpecifications.defaultProps = {
	onToggleSpecifications: () => null
};

export default ProductSpecifications;
