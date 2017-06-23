import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from '..';
import StoreLocation from '../../../StoreLocation/StoreLocation';
import { toggleStoreModal } from '../../../../redux/modules/modal';
import styles from './StoreModal.scss';

const StoreModal = ({ isOpen, storeName, onRequestClose }) => (
	<Modal
		isOpen={isOpen}
		contentLabel="Store Modal"
		overlayClassName={styles.overlay}
		className={styles.content}
		onRequestClose={onRequestClose}
		closeTimeoutMS={250}
	>
		<StoreLocation storeName={storeName} />
	</Modal>
);

StoreModal.propTypes = {
	isOpen: PropTypes.bool,
	storeName: PropTypes.string,
	onRequestClose: PropTypes.func
};

StoreModal.defaultProps = {
	isOpen: false,
	storeName: '',
	onRequestClose: () => null
};

function mapStateToProps(state) {
	return {
		isOpen: state.modal.storeModalOpen,
		storeName: state.modal.storeName
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onRequestClose: toggleStoreModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreModal);
