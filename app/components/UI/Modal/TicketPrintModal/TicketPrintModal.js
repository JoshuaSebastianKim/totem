import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from '..';
import { Spinner } from '../..';
import { togglePrintTicketModal } from '../../../../redux/modules/modal';
import { PrinterIcon } from '../../Icons';
import styles from './TicketPrintModal.scss';

const TicketPrintModal = ({ isOpen, onRequestClose }) => (
	<Modal
		isOpen={isOpen}
		contentLabel="Ticket Print Modal"
		portalClassName="TicketPrintModal"
		overlayClassName={styles.overlay}
		className={styles.content}
		onRequestClose={onRequestClose}
		closeTimeoutMS={250}
		shouldCloseOnOverlayClick={false}
	>
		<PrinterIcon className={styles.printerIcon} />

		<div className={styles.message}>
			Imprimiendo Ticket...
		</div>

		<Spinner className={styles.spinner} />
	</Modal>
);

TicketPrintModal.propTypes = {
	isOpen: PropTypes.bool,
	onRequestClose: PropTypes.func
};

TicketPrintModal.defaultProps = {
	isOpen: false,
	onRequestClose: () => null
};

function mapStateToProps(state) {
	return {
		isOpen: state.modal.ticketPrintModalOpen
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onRequestClose: togglePrintTicketModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketPrintModal);
