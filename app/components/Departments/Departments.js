// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Departments.scss';

export default class Departments extends PureComponent {
	static propTypes = {
		categoryTree: PropTypes.array.isRequired
	}

	render() {
		const { categoryTree } = this.props;

		return (
			<div className={styles.container}>
				<div className={styles.header}>Elegí una categoria</div>

				<div className={styles.departments}>
					{categoryTree.map(department => (
						<Link
							key={department.id}
							to={`/category/${department.id}`}
						>
							{department.name}
						</Link>
					))}
				</div>
			</div>
		);
	}
}
