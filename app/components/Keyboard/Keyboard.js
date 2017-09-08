import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { ScreenKeyboard, KeyboardButton, LatinLayout } from './ScreenKeyboard';
import { ArrowDownSmallIcon } from '../UI/Icons';
import styles from './Keyboard.scss';

const Keyboard = ({ input, open, toggleKeyboard }) => (
	<Motion
		defaultStypes={{ translateY: 0 }}
		style={{ translateY: open ? spring(0) : spring(100) }}
	>
		{interpolatingStyles => (
			<div
				className={`${styles.container}`}
				style={{
					transform: `translateY(${interpolatingStyles.translateY}%)`
				}}
			>
				<button
					className={`${styles.toggle} ${open ? styles.toggleHide : styles.toggleShow}`}
					onClick={toggleKeyboard}
				>
					<span className={styles.toggleLabel}>
						{open ? 'Ocultar teclado' : 'Mostrar teclado'}
					</span>

					<ArrowDownSmallIcon className={styles.toggleIcon} />
				</button>

				<ScreenKeyboard
					inputNode={input}
					layouts={[LatinLayout]}
					// leftButtons={[
					// 	<KeyboardButton
					// 		key="back"
					// 		onClick={() => null}
					// 		classes="keyboard-back-button"
					// 		value="< Back"
					// 	/>
					// ]}
					rightButtons={[
						<KeyboardButton
							key="submit"
							onClick={toggleKeyboard}
							value="Aceptar"
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
