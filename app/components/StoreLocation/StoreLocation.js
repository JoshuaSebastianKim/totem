import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LocationIcon } from '../UI/Icons';
import styles from './StoreLocation.scss';

class StoreModal extends PureComponent {
	static propTypes = {
		storeName: PropTypes.string
	}

	static defaultProps = {
		storeName: ''
	}

	render() {
		const { storeName } = this.props;

		return (
			<div className={styles.container}>
				<LocationIcon className={styles.marker} />

				<div className={styles.label}>
					ESTÁS COMPRANDO EN:
				</div>

				<div className={styles.storeName}>
					{storeName}
				</div>
			</div>
		);
	}

}

export default StoreModal;
