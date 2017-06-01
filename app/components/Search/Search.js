// @flow
import React, { Component } from 'react';
import styles from './Search.scss';
import { Logo, GoBack, Sidebar } from '../UI';

export default class Search extends Component {
	render() {
		return (
			<div className={styles.container}>
				<Sidebar className={styles.sidebar}>
					<div className={styles.logo}>
						<Logo />
					</div>
					<div className={styles.nav}>
						<div>Cart</div>
						<div>Search</div>
						<div>Categories</div>
						<div style={{ marginTop: 'auto' }}>Location</div>
					</div>
					<div className={styles.goback}>
						<GoBack />
					</div>
				</Sidebar>
			</div>
		);
	}
}
