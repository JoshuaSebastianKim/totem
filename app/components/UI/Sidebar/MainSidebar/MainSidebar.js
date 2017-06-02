import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Logo, GoBack, Sidebar } from '../../';
import { CartButton, SearchButton, CategoryButton, LocationButton } from '../../Button';
import styles from './MainSidebar.scss';

const MainSidebar = () => (
	<Sidebar className={styles.sidebar}>
		<div className={styles.logo}>
			<Link to="/">
				<Logo />
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
			<LocationButton style={{ marginTop: 'auto' }} />
		</div>
		<div className={styles.goback}>
			<GoBack />
		</div>
	</Sidebar>
);

export default MainSidebar;
