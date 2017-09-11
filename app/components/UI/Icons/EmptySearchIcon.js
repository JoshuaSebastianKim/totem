import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import EmptySearch from './svg/icn_busqueda_vacia.svg';

const EmptySearchIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={EmptySearch} />
	</div>
);

EmptySearchIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

EmptySearchIcon.defaultProps = {
	style: {},
	className: ''
};

export default EmptySearchIcon;
