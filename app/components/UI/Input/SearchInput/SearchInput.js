import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading-bar';
import { SearchIcon } from '../../Icons';
import { Input } from '../';
import styles from './SearchInput.scss';

class SearchInput extends PureComponent {
	static propTypes = {
		onFocus: PropTypes.func,
		onChange: PropTypes.func,
		onClear: PropTypes.func,
		style: PropTypes.object,
		className: PropTypes.string,
		value: PropTypes.string
	}

	static defaultProps = {
		onFocus: () => null,
		onChange: () => null,
		onClear: () => null,
		style: {},
		className: '',
		value: ''
	}

	handleInputChange = (value) => this.props.onChange(value)

	handleInputFocus = (inputDOM) => this.props.onFocus(inputDOM)

	handleClearSearch = () => this.props.onClear()

	render() {
		const { style, className, value } = this.props;

		return (
			<div className={`${styles.container} ${className}`} style={style}>
				<SearchIcon className={styles.icon} />

				<Input
					className={styles.input}
					value={value}
					placeholder="Escribe aquí tu búsqueda"
					onChange={this.handleInputChange}
					onFocus={this.handleInputFocus}
					autofocus
				/>

				{value !== '' &&
					<button
						className={styles.clear}
						onClick={this.handleClearSearch}
					>
						Nueva búsqueda
					</button>
				}

				<LoadingBar className={styles.loader} />
			</div>
		);
	}

}

export default SearchInput;
