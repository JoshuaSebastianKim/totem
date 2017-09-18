import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Plus from './svg/icn_plus.svg';

const PlusIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Plus} />
	</div>
);

PlusIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

PlusIcon.defaultProps = {
	style: {},
	className: ''
};

export default PlusIcon;
