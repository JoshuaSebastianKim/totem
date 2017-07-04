import React from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import Search from './svg/icn_search.svg';

const SearchIcon = ({ className, style }) => (
	<div className={className} style={style}>
		<InlineSVG src={Search} />
	</div>
);

SearchIcon.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

SearchIcon.defaultProps = {
	style: {},
	className: ''
};

export default SearchIcon;
