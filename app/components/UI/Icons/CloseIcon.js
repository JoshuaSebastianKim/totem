import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Close from './svg/icn_close.svg';

const CloseIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Close} />
	</div>
);

CloseIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

CloseIcon.defaultProps = {
	style: {},
	className: ''
};

export default CloseIcon;
