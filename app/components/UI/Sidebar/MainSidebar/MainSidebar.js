import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom';
import { goBack } from 'react-router-redux';
import { Sidebar } from '../../';
import { LogoIcon } from '../../Icons';
import { CartButton, SearchButton, CategoryButton, LocationButton, GoBackButton } from '../../Buttons';
import { toggleStoreModal } from '../../../../redux/modules/modal';
import { StoreModal } from '../../Modal';
import styles from './MainSidebar.scss';

const MainSidebar = ({ onGoBack, onToggleStoreModal }) => (
	<Sidebar className={styles.sidebar}>
		<div className={styles.logo}>
			<Link to="/">
				<LogoIcon className={styles.logoIcon} />
			</Link>
		</div>

		<div className={styles.nav}>
			<NavLink to="/cart" activeClassName={styles.activeButton}>
				<CartButton />
			</NavLink>

			<NavLink to="/search" activeClassName={styles.activeButton}>
				<SearchButton />
			</NavLink>

			<NavLink to="/category" activeClassName={styles.activeButton}>
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
	onToggleStoreModal: PropTypes.func
};

MainSidebar.defaultProps = {
	onGoBack: () => null,
	onToggleStoreModal: () => null
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onGoBack: goBack,
		onToggleStoreModal: toggleStoreModal
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(MainSidebar);
