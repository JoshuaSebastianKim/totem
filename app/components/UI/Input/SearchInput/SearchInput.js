import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SearchIcon } from '../../Icons';
import { Input } from '../';
import styles from './SearchInput.scss';

class SearchInput extends PureComponent {
	static propTypes = {
		onFocus: PropTypes.func,
		onChange: PropTypes.func
	}

	static defaultProps = {
		onFocus: () => null,
		onChange: () => null
	}

	state = {
		inputValue: ''
	}

	handleInputChange = (value) => {
		this.setState({
			inputValue: value
		});

		this.props.onChange(value);
	}

	handleInputFocus = (inputDOM) => this.props.onFocus(inputDOM)

	render() {
		return (
			<div className={styles.searchInput}>
				<SearchIcon />

				<Input
					value={this.state.inputValue}
					onChange={this.handleInputChange}
					onFocus={this.handleInputFocus}
				/>
			</div>
		);
	}

}

export default SearchInput;
