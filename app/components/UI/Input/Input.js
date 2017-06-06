import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Input extends PureComponent {
	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		onChange: PropTypes.func.isRequired,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func
	};

	static defaultProps = {
		value: '',
		onFocus: () => null,
		onBlur: () => null
	};

	handleInput = (event) => this.props.onChange(event.target.value)

	handleFocus = () => this.props.onFocus(this.inputDOM)

	render() {
		const { value, onBlur } = this.props;

		return (
			<input
				value={value}
				onInput={this.handleInput}
				onFocus={this.handleFocus}
				onBlur={onBlur}
				ref={(input) => { this.inputDOM = input; }}
			/>
		);
	}
}

export default Input;
