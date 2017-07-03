import React from 'react';
import PropTypes from 'prop-types';
import { TrashIcon } from '../Icons';
import { Button } from './';

const RemoveButton = ({ className, style, iconSize, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<TrashIcon style={{ width: iconSize, margin: 'auto' }} />
	</Button>
);

RemoveButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	iconSize: PropTypes.number,
	onClick: PropTypes.func
};

RemoveButton.defaultProps = {
	style: {},
	className: '',
	iconSize: 36,
	onClick: () => null
};

export default RemoveButton;
