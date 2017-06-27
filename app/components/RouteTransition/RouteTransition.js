import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { RouteTransition as Transition } from 'react-router-transition';
import { CSSTransitionGroup } from 'react-transition-group'
import styles from './RouteTransition.scss';

const RouteTransition = ({ children }) => (
	<Route render={() => (
		<CSSTransitionGroup
			className={styles.container}
			transitionName="fade"
			transitionEnterTimeout={300}
			transitionLeaveTimeout={300}
		>
			{children}
		</CSSTransitionGroup>
	)}
	/>
);

RouteTransition.propTypes = {
	children: PropTypes.node.isRequired
};

export default RouteTransition;
