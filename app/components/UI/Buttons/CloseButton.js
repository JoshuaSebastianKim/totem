import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '../Icons';
import { Button } from './';

const CloseButton = ({ className, style, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<CloseIcon style={{ width: 23, margin: 'auto' }} />
	</Button>
);

CloseButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func
};

CloseButton.defaultProps = {
	style: {},
	className: '',
	onClick: () => null
};

export default CloseButton;
