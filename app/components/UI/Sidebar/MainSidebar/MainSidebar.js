import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom';
import { goBack } from 'react-router-redux';
import { Sidebar } from '../../';
import { LogoIcon } from '../../Icons';
import { CartButton, SearchButton, CategoryButton, LocationButton, GoBackButton } from '../../Buttons';
import { toggleCartModal, toggleStoreModal } from '../../../../redux/modules/modal';
import { CartModal, StoreModal } from '../../Modal';
import styles from './MainSidebar.scss';

function checkIfActive(target, match, currentLocation, lastLocation, isCartActive = false) {
	if (isCartActive) {
		return false;
	}

	if (match) {
		return true;
	}

	if (/\/product\//.test(currentLocation) && lastLocation.match(target)) {
		return true;
	}

	return false;
}

const MainSidebar = ({
	onGoBack,
	onToggleStoreModal,
	onToggleCartModal,
	currentLocation,
	lastLocation,
	isCartActive
}) => (
	<Sidebar className={styles.sidebar}>
		<div className={styles.logo}>
			<Link to="/">
				<LogoIcon className={styles.logoIcon} />
			</Link>
		</div>

		<div className={styles.nav}>
			<div className={isCartActive ? styles.activeButton : ''}>
				<CartButton onClick={onToggleCartModal} />
			</div>
			<CartModal />

			<NavLink
				to="/search"
				activeClassName={styles.activeButton}
				isActive={match => checkIfActive('search', match, currentLocation, lastLocation, isCartActive)}
			>
				<SearchButton />
			</NavLink>

			<NavLink
				to="/category"
				activeClassName={styles.activeButton}
				isActive={match => checkIfActive('category', match, currentLocation, lastLocation, isCartActive)}
			>
				<CategoryButton />
			</NavLink>

			<LocationButton className={styles.locationButton} onClick={onToggleStoreModal} />
			<StoreModal />
		</div>

		<div className={styles.goback}>
			<GoBackButton className={styles.goBackButton} onClick={onGoBack} />
			<div className={styles.goBackLabel}>
				INICIO
			</div>
		</div>
	</Sidebar>
);

MainSidebar.propTypes = {
	onGoBack: PropTypes.func,
	onToggleCartModal: PropTypes.func,
	onToggleStoreModal: PropTypes.func,
	currentLocation: PropTypes.string,
	lastLocation: PropTypes.string,
	isCartActive: PropTypes.bool
};

MainSidebar.defaultProps = {
	onGoBack: () => null,
	onToggleCartModal: () => null,
	onToggleStoreModal: () => null,
	currentLocation: '',
	lastLocation: '',
	isCartActive: false
};

function mapStateToProps(state) {
	return {
		currentLocation: state.history.currentLocation,
		lastLocation: state.history.lastLocation,
		isCartActive: state.modal.cartModalOpen
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onGoBack: goBack,
		onToggleCartModal: toggleCartModal,
		onToggleStoreModal: toggleStoreModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSidebar);
