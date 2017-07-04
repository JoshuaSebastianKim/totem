import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Menu from './svg/icn_menu.svg';

const CategoryIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Menu} />
	</div>
);

CategoryIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

CategoryIcon.defaultProps = {
	style: {},
	className: ''
};

export default CategoryIcon;
