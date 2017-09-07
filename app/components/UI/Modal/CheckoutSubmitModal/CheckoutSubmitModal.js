import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '..';
import { Spinner } from '../..';
import { Button } from '../../Buttons';
import { CartIcon } from '../../Icons';
import styles from './CheckoutSubmitModal.scss';

const CheckoutSubmitModal = ({ isOpen }) => (
	<Modal
		isOpen={isOpen}
		contentLabel="Checkout Submit Modal"
		portalClassName="CheckoutSubmitModal"
		overlayClassName={styles.overlay}
		className={styles.content}
		closeTimeoutMS={250}
	>
		<div className={styles.submit}>
			<CartIcon className={styles.icon} />

			<div className={styles.message}>
				Estamos procesando su pedido...
			</div>

			<Spinner className={styles.spinner} />
		</div>
	</Modal>
);

CheckoutSubmitModal.propTypes = {
	isOpen: PropTypes.bool
};

CheckoutSubmitModal.defaultProps = {
	isOpen: false
};

export default CheckoutSubmitModal;
