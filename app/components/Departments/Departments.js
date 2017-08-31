/* eslint global-require: 0 */
// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AireLibreIcon, CuidadoPersonalIcon, HogarIcon, LineaBlancaIcon, TecnologiaIcon } from '../UI/Icons';
import Department from './Department';
import styles from './Departments.scss';

const departmentAssets = {
	'1': {
		banner: require('../../images/mundo-tecnologia.png'),
		icon: TecnologiaIcon
	},
	'2': {
		banner: require('../../images/mundo-lineablanca.png'),
		icon: LineaBlancaIcon
	},
	'3': {
		banner: require('../../images/mundo-cuidadopersonal.png'),
		icon: CuidadoPersonalIcon
	},
	'4': {
		banner: require('../../images/mundo-hogar.png'),
		icon: HogarIcon
	},
	'5': {
		banner: require('../../images/mundo-airelibre.png'),
		icon: AireLibreIcon
	}
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
							className={styles.departmentLink}
						>
							<Department
								id={department.id}
								name={department.name}
								bannerSrc={departmentAssets[department.id].banner}
								Icon={departmentAssets[department.id].icon}
							/>
						</Link>
					))}
				</div>
			</div>
		);
	}
}
