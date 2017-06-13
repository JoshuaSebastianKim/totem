// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.scss';

export default class Home extends Component {
	render() {
		return (
			<div className={styles.container}>
				<Link to="/category">
					<h2>Home</h2>
				</Link>
			</div>
		);
	}
}
