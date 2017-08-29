import React from 'react';
import { array, string, func } from 'prop-types';
import { ShippingIcon, StoreIcon } from '../../../UI/Icons';
import styles from './ShippingStep.scss';

const ShippingOptions = ({ slas, selectedSla, onClick }) => (
	<div className={styles.shippingOptions}>
		{slas.map(sla => (
			<button
				key={sla.id}
				type="button"
				className={`${styles.shippingOption} ${sla.id === selectedSla && styles.shippingOptionActive}`}
				onClick={() => onClick(sla.id)}
			>
				<div className={styles.shippingOptionIcon}>
					{/Retiro en tienda/ig.test(sla.id) &&
						<StoreIcon />
					}

					{/Envio a domicilio/ig.test(sla.id) &&
						<ShippingIcon />
					}
				</div>

				<div className={styles.shippingOptionLabel}>
					{sla.name}
				</div>
			</button>
		))}
	</div>
);

ShippingOptions.propTypes = {
	slas: array.isRequired,
	selectedSla: string.isRequired,
	onClick: func
};

ShippingOptions.defaultProps = {
	onClick: () => null
};

export default ShippingOptions;
