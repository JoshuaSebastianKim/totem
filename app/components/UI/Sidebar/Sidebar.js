import React from 'react';
import PropTypes from 'prop-types';
import styles from './Sidebar.scss';

console.log(styles);

const Sidebar = ({ children, className, style }) => (
	<div className={`${styles.container} ${className}`} style={style}>
		{children}
	</div>
);

Sidebar.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	style: PropTypes.object,
	className: PropTypes.string
};

Sidebar.defaultProps = {
	className: ''
};

export default Sidebar;
