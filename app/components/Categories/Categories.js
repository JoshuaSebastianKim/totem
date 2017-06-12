// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Categories.scss';

export default class Categories extends Component {
	static propTypes = {
		categoryTree: PropTypes.object
	}

	render() {
		const { categoryTree } = this.props;

		return (
			<div className={styles.container}>
				Categories
			</div>
		);
	}
}
