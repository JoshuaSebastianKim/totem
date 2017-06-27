import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';
import { Modal } from '..';
import { removeFromCart } from '../../../../redux/modules/cart';
import { closeCartModal } from '../../../../redux/modules/modal';
import { getCartItems } from '../../../../redux/selectors/cartSelectors';
import Cart from '../../../Cart/Cart';
import styles from './CartModal.scss';

const StoreModal = ({ onCloseCart, onRemoveItem, isOpen, items }) => (
	<Modal
		isOpen={isOpen}
		contentLabel="Cart Modal"
		portalClassName="CartModal"
		overlayClassName={styles.overlay}
		className={styles.content}
		onRequestClose={onCloseCart}
		closeTimeoutMS={500}
	>
		<Motion
			defaultStyle={{ translateX: 100 }}
			style={{ translateX: isOpen ? spring(0) : spring(100) }}
		>
			{interpolatingStyle => (
				<Cart
					style={{
						transform: `translateX(${interpolatingStyle.translateX}%)`
					}}
					items={items}
					onCloseCart={onCloseCart}
					onRemoveItem={onRemoveItem}
				/>
			)}
		</Motion>
	</Modal>
);

StoreModal.propTypes = {
	onCloseCart: PropTypes.func,
	onRemoveItem: PropTypes.func,
	isOpen: PropTypes.bool,
	items: PropTypes.array
};

StoreModal.defaultProps = {
	onCloseCart: () => null,
	onRemoveItem: () => null,
	isOpen: false,
	items: []
};

function mapStateToProps(state) {
	return {
		isOpen: state.modal.cartModalOpen,
		items: getCartItems(state)
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onCloseCart: closeCartModal,
		onRemoveItem: removeFromCart
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreModal);
