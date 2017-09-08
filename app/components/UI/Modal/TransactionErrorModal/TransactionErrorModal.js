import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '..';
import { Button } from '../../Buttons';
import { SecureIcon } from '../../Icons';
import styles from './TransactionErrorModal.scss';

const TransactionErrorModal = ({ isOpen, onRequestClose, error }) => (
	<Modal
		isOpen={isOpen}
		contentLabel="Checkout Submit Modal"
		portalClassName="TransactionErrorModal"
		overlayClassName={styles.overlay}
		className={styles.content}
		onRequestClose={onRequestClose}
		closeTimeoutMS={250}
	>
		<SecureIcon className={styles.icon} />

		<div className={styles.warning}>
			Por favor revise los
			<br />
			detalles de pago
		</div>

		<div className={styles.errorMessage}>
			{error.message}
		</div>

		{error.details &&
			<div className={styles.errorDetails}>
				{error.details}
			</div>
		}

		<Button className={styles.close} onClick={onRequestClose}>
			Hacer la revisión de datos o pagar de otra manera
		</Button>
	</Modal>
);

TransactionErrorModal.propTypes = {
	isOpen: PropTypes.bool,
	onRequestClose: PropTypes.func,
	error: PropTypes.object
};

TransactionErrorModal.defaultProps = {
	isOpen: false,
	onRequestClose: () => null,
	error: {}
};

export default TransactionErrorModal;
