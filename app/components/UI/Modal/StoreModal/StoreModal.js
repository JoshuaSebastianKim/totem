import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleStoreModal, setStoreName } from '../../../../redux/modules/modal';
import { Modal } from '..';
import StoreLocation from '../../../StoreLocation/StoreLocation';
import styles from './StoreModal.scss';

const StoreModal = ({ isOpen, storeName, toggleStoreModal, setStoreName }) => (
	<Modal
		isOpen={isOpen}
		contentLabel="Store Modal"
		overlayClassName={styles.overlay}
		className={styles.content}
		onRequestClose={toggleStoreModal}
		closeTimeoutMS={250}
	>
		<StoreLocation
			storeName={storeName}
			onSubmitStoreName={setStoreName}
		/>
	</Modal>
);

StoreModal.propTypes = {
	isOpen: PropTypes.bool,
	storeName: PropTypes.string,
	toggleStoreModal: PropTypes.func,
	setStoreName: PropTypes.func
};

StoreModal.defaultProps = {
	isOpen: false,
	storeName: '',
	toggleStoreModal: () => null,
	setStoreName: () => null
};

function mapStateToProps(state) {
	return {
		isOpen: state.modal.storeModalOpen,
		storeName: state.modal.storeName
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ toggleStoreModal, setStoreName }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreModal);
