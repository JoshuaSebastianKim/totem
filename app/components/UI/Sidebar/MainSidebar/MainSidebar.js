import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sidebar } from '../../';
import { LogoIcon } from '../../Icons';
import { CartButton, SearchButton, CategoryButton, LocationButton, GoBackButton } from '../../Buttons';
import styles from './MainSidebar.scss';

const MainSidebar = () => (
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
			<LocationButton className={styles.locationButton} />
		</div>

		<div className={styles.goback}>
			<GoBackButton className={styles.goBackButton} />
			<div className={styles.goBackLabel}>
				INICIO
			</div>
		</div>
	</Sidebar>
);

export default MainSidebar;
