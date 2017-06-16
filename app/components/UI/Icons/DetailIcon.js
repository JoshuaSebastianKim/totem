import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from './InlineSVG';
import Detail from './svg/icn_details.svg';

const DetailIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Detail} />
	</div>
);

DetailIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

DetailIcon.defaultProps = {
	style: {},
	className: ''
};

export default DetailIcon;
