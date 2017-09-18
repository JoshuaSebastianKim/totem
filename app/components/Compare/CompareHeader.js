import React from 'react';
import { Link } from 'react-router-dom';
import { CloseButton } from '../UI/Buttons';
import { CompareIcon } from '../UI/Icons';
import styles from './CompareHeader.scss';

type Props = {
	lastLocation: string
};

const CompareHeader = ({ lastLocation }: Props) => (
	<div className={styles.container}>
		<CompareIcon className={styles.icon} />

		<span className={styles.title}>
			Comparar productos
		</span>

		<Link to={lastLocation}>
			<CloseButton className={styles.close} />
		</Link>
	</div>
);

export default CompareHeader;
