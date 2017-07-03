import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '../Icons';
import { Button } from './';

const CloseButton = ({ className, style, iconSize, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<CloseIcon style={{ width: iconSize, margin: 'auto' }} />
	</Button>
);

CloseButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	iconSize: PropTypes.number,
	onClick: PropTypes.func
};

CloseButton.defaultProps = {
	style: {},
	className: '',
	iconSize: 23,
	onClick: () => null
};

export default CloseButton;
