import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from '..';
import { Button } from '../../Buttons';
import { CartAddIcon, ArrowLeftIcon, ArrowRightIcon } from '../../Icons';
import { toggleAddedToCartModal } from '../../../../redux/modules/modal';
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
				<div>
					Producto agregado
				</div>
				<div>
					al carrito
				</div>
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

			<Button className={styles.checkout}>
				<span className={styles.actionText}>
					FINALIZAR PEDIDO
				</span>

				<ArrowRightIcon className={styles.actionIcon} />
			</Button>
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
		onRequestClose: toggleAddedToCartModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddedToCartModal);
