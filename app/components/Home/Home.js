// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../../images/home.png';
import styles from './Home.scss';

export default class Home extends Component {
	render() {
		return (
			<div className={styles.container}>
				<Link to="/category" className={styles.link}>
					<img src={homeImage} alt="Home" />
				</Link>
			</div>
		);
	}
}
