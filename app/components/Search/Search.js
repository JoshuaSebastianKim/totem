// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Search.scss';
import { SearchInput } from '../UI/Input';

export default class Search extends PureComponent {
	static propTypes = {
		onFocusInput: PropTypes.func
	}

	static defaultProps = {
		onFocusInput: null
	}

	render() {
		const { onFocusInput } = this.props;

		return (
			<div className={styles.container}>
				<SearchInput
					onFocus={onFocusInput}
				/>
			</div>
		);
	}
}
