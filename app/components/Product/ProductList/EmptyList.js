import React from 'react';
import { EmptySearchIcon } from '../../UI/Icons';
import styles from './EmptyList.scss';

type Props = {
	query: object
};

const EmptyList = ({ query }: Props) => (
	<div className={styles.container}>
		<EmptySearchIcon className={styles.icon} />

		<div className={styles.label}>
			No se encontraron resultados{`${query.text ? ' para:' : ''}`}
		</div>

		{query.text &&
			<div className={styles.term}>
				&quot;{query.text}&quot;
			</div>
		}

		{query.text &&
			<div className={styles.tips}>
				Revisa la ortografía y/o simplificá la búsqueda
			</div>
		}
	</div>
);

export default EmptyList;
