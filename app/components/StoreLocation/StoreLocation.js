import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LocationIcon } from '../UI/Icons';
import styles from './StoreLocation.scss';

class StoreModal extends PureComponent {
	static propTypes = {
		storeName: PropTypes.string,
		onSubmitStoreName: PropTypes.func
	}

	static defaultProps = {
		storeName: '',
		onSubmitStoreName: () => null
	}

	state = {
		storeNameValue: ''
	}

	handleChangeStoreName = (event) => {
		this.setState({
			storeNameValue: event.target.value
		});
	}

	handleSubmitStoreName = () => {
		this.props.onSubmitStoreName(this.state.storeNameValue);
	}

	render() {
		const { storeNameValue } = this.state;
		const { storeName } = this.props;

		return (
			<div className={styles.container}>
				<LocationIcon className={styles.marker} />

				<div className={styles.label}>
					ESTÁS COMPRANDO EN:
				</div>

				{storeName ?
					<div className={styles.storeName}>
						{storeName}
					</div> :
					<div className={styles.storeNameInput}>
						<input
							className={styles.storeNameInputValue}
							type="text"
							value={storeNameValue}
							onChange={this.handleChangeStoreName}
							placeholder="Ingrese el nombre de la sucursal"
						/>
						<button
							className={styles.storeNameInputSubmit}
							onClick={this.handleSubmitStoreName}
						>
							Enviar
						</button>
					</div>
				}
			</div>
		);
	}

}

export default StoreModal;
