import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LogoIcon } from '../Icons';
import styles from './Spinner.scss';

class Spinner extends Component {
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object
	}

	static defaultProps = {
		className: '',
		style: {}
	}

	render() {
		const { className, style } = this.props;

		return (
			<div className={`${styles.container} ${className}`} style={style}>
				<LogoIcon className={styles.logo} />
			</div>
		);
	}

}

export default Spinner;
