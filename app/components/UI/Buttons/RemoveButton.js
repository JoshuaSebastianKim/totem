import React from 'react';
import PropTypes from 'prop-types';
import { TrashIcon } from '../Icons';
import { Button } from './';

const RemoveButton = ({ className, style, onClick }) => (
	<Button className={className} style={style} onClick={onClick}>
		<TrashIcon style={{ width: 36, margin: 'auto' }} />
	</Button>
);

RemoveButton.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string,
	onClick: PropTypes.func
};

RemoveButton.defaultProps = {
	style: {},
	className: '',
	onClick: () => null
};

export default RemoveButton;
