import React from 'react';
import { array, string, func } from 'prop-types';
import { CheckIcon } from '../../../UI/Icons';
import styles from './StepSummary.scss';

const stepHierarchy = ['clientProfile', 'shipping', 'payment'];

function isActive(step, activeStep) {
	return step === activeStep && styles.activeStep;
}

function hasSuccess(step, activeStep) {
	return stepHierarchy.indexOf(step) < stepHierarchy.indexOf(activeStep) && styles.successStep;
}

function getClassNames(step, activeStep) {
	const activeClassName = isActive(step.id, activeStep);
	const successClassName = hasSuccess(step.id, activeStep);

	return `${styles.step} ${activeClassName} ${successClassName}`;
}

const StepSummary = ({ steps, activeStep, onClick }) => (
	<div className={styles.container}>
		{steps.map(step => (
			<button
				key={step.id}
				className={getClassNames(step, activeStep)}
				onClick={() => onClick(step.id)}
			>
				<div className={styles.stepIcon}>
					<step.icon.component
						className={styles.icon}
						style={step.icon.style}
					/>

					<CheckIcon className={styles.successIcon} />
				</div>

				<div className={styles.stepLabel}>
					{step.label}
				</div>

				<div className={styles.underline} />
			</button>
		))}
	</div>
);

StepSummary.propTypes = {
	steps: array.isRequired,
	activeStep: string.isRequired,
	onClick: func
};

StepSummary.defaultProps = {
	onClick: () => null
};

export default StepSummary;
