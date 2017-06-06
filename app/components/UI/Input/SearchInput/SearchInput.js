import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { SearchIcon } from '../../Icons';
import { Input } from '../';
import styles from './SearchInput.scss';

class SearchInput extends PureComponent {
	static propTypes = {
		onFocus: PropTypes.func,
		style: PropTypes.object,
		className: PropTypes.string,
		debounceTime: PropTypes.number,
		onSearch: PropTypes.func,
		clearSearch: PropTypes.func
	}

	static defaultProps = {
		onFocus: () => null,
		style: {},
		className: '',
		debounceTime: 1000,
		onSearch: () => null,
		clearSearch: () => null
	}

	state = {
		inputValue: ''
	}

	search = _.debounce((term) => this.props.onSearch(term), this.props.debounceTime)

	handleInputChange = (value) => {
		// Set internat state
		this.setState({
			inputValue: value
		});

		if (value.length > 3) {
			this.search(value);
		}
	}

	handleInputFocus = (inputDOM) => this.props.onFocus(inputDOM)

	clearSearch = () => {
		// Reset state
		this.setState({
			inputValue: ''
		});

		this.props.clearSearch();
	}

	render() {
		const { inputValue } = this.state;
		const { style, className } = this.props;

		return (
			<div className={`${styles.container} ${className}`} style={style}>
				<SearchIcon
					className={styles.icon}
				/>

				<Input
					className={styles.input}
					value={this.state.inputValue}
					placeholder="Escribe aquí tu búsqueda"
					onChange={this.handleInputChange}
					onFocus={this.handleInputFocus}
				/>

				{inputValue !== '' &&
					<button
						className={styles.clear}
						onClick={this.clearSearch}
					>
						Nueva búsqueda
					</button>
				}
			</div>
		);
	}

}

export default SearchInput;
