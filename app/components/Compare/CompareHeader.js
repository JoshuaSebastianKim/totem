import React from 'react';
import { CloseButton } from '../UI/Buttons';
import { CompareIcon } from '../UI/Icons';
import styles from './CompareHeader.scss';

const CompareHeader = ({}) => (
	<div className={styles.container}>
		<CompareIcon className={styles.icon} />

		<span className={styles.title}>
			Comparar productos
		</span>

		<CloseButton className={styles.close} />
	</div>
);

export default CompareHeader;
