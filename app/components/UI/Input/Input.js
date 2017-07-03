import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Input extends PureComponent {
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		placeholder: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFocus: PropTypes.func,
		onBlur: PropTypes.func
	};

	static defaultProps = {
		className: '',
		style: {},
		value: '',
		placeholder: '',
		onFocus: () => null,
		onBlur: () => null
	};

	handleInput = (event) => this.props.onChange(event.target.value)

	handleFocus = () => this.props.onFocus(this.inputDOM)

	render() {
		const { className, style, value, placeholder, onBlur } = this.props;

		return (
			<input
				className={className}
				style={style}
				value={value}
				placeholder={placeholder}
				onChange={this.handleInput}
				onFocus={this.handleFocus}
				onBlur={onBlur}
				ref={(input) => { this.inputDOM = input; }}
			/>
		);
	}
}

export default Input;
