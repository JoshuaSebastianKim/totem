import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Ink from 'react-ink'

export default class KeyboardButton extends PureComponent {
	static propTypes = {
		value: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.node.isRequired]),
		classes: PropTypes.string,
		onClick: PropTypes.func.isRequired,
		autofocus: PropTypes.bool,
		isDisabled: PropTypes.bool
	};

	static defaultProps = {
		autofocus: false,
		isDisabled: false
	};

	handleClick = (event) => {
		const cursorPos = {
			top: event.clientY,
			left: event.clientX,
			time: Date.now()
		};

		this.setState({ cursorPos })

		this.props.onClick(this.props.value);
	}

	render() {
		return (
			<button
				type="button"
				className={`keyboard-button ${this.props.classes}`}
				onClick={this.props.isDisabled ? null : this.handleClick}
				autoFocus={this.props.autofocus}
				disabled={this.props.isDisabled}
				style={{ position: 'relative' }}
			>
				{this.props.value}
				<Ink />
			</button>
		);
	}
}
