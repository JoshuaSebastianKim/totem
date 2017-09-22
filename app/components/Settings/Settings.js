import React, { PureComponent } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { Button } from '../UI/Buttons';
import styles from './Settings.scss';

type Props = {
	availableEnvironments: Array<string>,
	availableStores: {
		[number]: Store
	},
	environment: ?string,
	store: ?string,
	setEnvironment: () => void,
	setStore: () => void,
	submitSettings: () => void
};

class Settings extends PureComponent {
	props: Props

	fields = [{
		id: 'environment',
		label: 'Ambiente'
	}, {
		id: 'store',
		label: 'Tienda'
	}];

	getValue = (field) => this.props[field]

	getOptions = (field) => {
		switch (field) {
			case 'environment': {
				const { availableEnvironments } = this.props;

				return availableEnvironments.map(env => ({ value: env, label: env }));
			}
			case 'store': {
				const { availableStores } = this.props;

				return Object.keys(availableStores).map(key => ({
					value: key,
					label: availableStores[key].name
				}));
			}
			default:
		}
	}

	handleSelectChange = (field, option) => {
		switch (field) {
			case 'environment':
				this.props.setEnvironment(option.value);
				break;
			case 'store':
				this.props.setStore(option.value);
				break;
			default:
		}
	}

	handleSubmitClick = () => {
		this.props.submitSettings();
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.title}>
					Configuración
				</div>

				{this.fields.map(field => (
					<div key={field.id} className={styles.field}>
						<div className={styles.label}>
							{field.label}
						</div>

						<Select
							className={styles.select}
							name={field.id}
							value={this.getValue(field.id)}
							options={this.getOptions(field.id)}
							onChange={(option) => this.handleSelectChange(field.id, option)}
							clearable={false}
						/>
					</div>
				))}

				<Link to="/">
					<Button
						className={styles.submit}
						onClick={this.handleSubmitClick}
					>
						Continuar
					</Button>
				</Link>
			</div>
		);
	}
}

export default Settings;
