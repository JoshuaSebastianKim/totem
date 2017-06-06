import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { ScreenKeyboard, KeyboardButton, LatinLayout } from './ScreenKeyboard';
import styles from './Keyboard.scss';

const Keyboard = ({ input, open, toggleKeyboard }) => (
	<Motion
		defaultStyle={{ translate: 100 }}
		style={open ?
			{ translate: spring(0) } :
			{ translate: spring(100) }
		}
	>
		{interpolated => (
			<div
				className={styles.container}
				style={{
					transform: `translateY(${interpolated.translate}%)`
				}}
			>
				<button
					className={`${styles.toggle} ${open ? styles.toggleHide : styles.toggleShow}`}
					onClick={toggleKeyboard}
				>
					{open ? 'Ocultar teclado' : 'Mostrar teclado'}
				</button>

				<ScreenKeyboard
					inputNode={input}
					layouts={[LatinLayout]}
					leftButtons={[
						<KeyboardButton
							key="back"
							onClick={() => null}
							classes="keyboard-back-button"
							value="< Back"
						/>
					]}
					rightButtons={[
						<KeyboardButton
							key="submit"
							onClick={() => null}
							value="Submit"
							classes="keyboard-submit-button"
						/>
					]}
				/>
			</div>
		)}
	</Motion>
);

Keyboard.propTypes = {
	input: PropTypes.object,
	toggleKeyboard: PropTypes.func,
	open: PropTypes.bool
};

Keyboard.defaultProps = {
	input: null,
	toggleKeyboard: () => null,
	open: false
};

export default Keyboard;
