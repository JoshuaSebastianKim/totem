// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Categories.scss';

export default class Categories extends Component {
	static propTypes = {
		categoryTree: PropTypes.object,
		match: PropTypes.object
	}

	render() {
		const { categoryTree, match } = this.props;

		return (
			<div className={styles.container}>

				{categoryTree.children.map(category => (
					<Link
						key={category.id}
						to={`${match.url}/${category.id}`}
					>
						{category.name}
					</Link>
				))}
			</div>
		);
	}
}
