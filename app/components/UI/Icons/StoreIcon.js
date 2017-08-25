import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Store from './svg/icn_store.svg';

const StoreIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Store} />
	</div>
);

StoreIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

StoreIcon.defaultProps = {
	style: {},
	className: ''
};

export default StoreIcon;
