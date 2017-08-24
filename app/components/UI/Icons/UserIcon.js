import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import User from './svg/icn_user.svg';

const UserIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={User} />
	</div>
);

UserIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

UserIcon.defaultProps = {
	style: {},
	className: ''
};

export default UserIcon;
