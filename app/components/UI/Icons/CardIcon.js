import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Card from './svg/icn_card.svg';

const CardIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Card} />
	</div>
);

CardIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

CardIcon.defaultProps = {
	style: {},
	className: ''
};

export default CardIcon;
