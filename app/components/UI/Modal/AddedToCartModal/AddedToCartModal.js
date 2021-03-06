import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Modal } from '..';
import { Button } from '../../Buttons';
import { CartAddIcon, ArrowLeftIcon, ArrowRightIcon } from '../../Icons';
import { closeAddedToCartModal } from '../../../../redux/modules/modal';
import styles from './AddedToCartModal.scss';

const AddedToCartModal = ({ isOpen, onRequestClose }) => (
	<Modal
		isOpen={isOpen}
		contentLabel="Added To Cart Modal"
		portalClassName="AddedToCartModal"
		overlayClassName={styles.overlay}
		className={styles.content}
		onRequestClose={onRequestClose}
		closeTimeoutMS={250}
	>
		<div className={styles.message}>
			<CartAddIcon className={styles.messageIcon} />

			<div className={styles.messageText}>
				Producto agregado
				<br />
				al carrito
			</div>
		</div>

		<div className={styles.actions}>
			<Button
				className={styles.keepBuying}
				onClick={onRequestClose}
			>
				<ArrowLeftIcon className={styles.actionIcon} />

				<span className={styles.actionText}>
					SEGUIR COMPRANDO
				</span>
			</Button>

			<Link to="/checkout">
				<Button
					className={styles.checkout}
					onClick={onRequestClose}
				>
					<span className={styles.actionText}>
						FINALIZAR PEDIDO
					</span>

					<ArrowRightIcon className={styles.actionIcon} />
				</Button>
			</Link>
		</div>
	</Modal>
);

AddedToCartModal.propTypes = {
	isOpen: PropTypes.bool,
	onRequestClose: PropTypes.func
};

AddedToCartModal.defaultProps = {
	isOpen: false,
	onRequestClose: () => null
};

function mapStateToProps(state) {
	return {
		isOpen: state.modal.addedToCartOpen
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onRequestClose: closeAddedToCartModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddedToCartModal);
