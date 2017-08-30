// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import bannerAireLibre from '../../images/mundo-airelibre.png';
import bannerCuidadoPersonal from '../../images/mundo-cuidadopersonal.png';
import bannerHogar from '../../images/mundo-hogar.png';
import bannerLineaBlanca from '../../images/mundo-lineablanca.png';
import bannerTecnologia from '../../images/mundo-tecnologia.png';
import styles from './Departments.scss';

const banners = {
	'1': bannerTecnologia,
	'2': bannerLineaBlanca,
	'3': bannerCuidadoPersonal,
	'4': bannerHogar,
	'5': bannerAireLibre
};

export default class Departments extends PureComponent {
	static propTypes = {
		categoryTree: PropTypes.array.isRequired
	}

	render() {
		const { categoryTree } = this.props;

		return (
			<div className={styles.container}>
				<div className={styles.header}>Encontrá aquí lo que estás busando</div>

				<div className={styles.departments}>
					{categoryTree.map(department => (
						<Link
							key={department.id}
							to={`/category/${department.id}`}
							className={styles.department}
						>
							<img src={banners[department.id]} alt={department.name} />
							<div className={styles.departmentTitle}>
								<span className={styles.departmentTitleName}>
									{department.name}
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		);
	}
}
