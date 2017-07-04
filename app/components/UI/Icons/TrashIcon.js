import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Trash from './svg/icn_trash.svg';

const TrashIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Trash} />
	</div>
);

TrashIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

TrashIcon.defaultProps = {
	style: {},
	className: ''
};

export default TrashIcon;
