import React from 'react';
import { array, string } from 'prop-types';
import { CheckIcon } from '../../../UI/Icons';
import styles from './StepSummary.scss';

const stepHierarchy = ['profile', 'shipping', 'payment'];

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

const StepSummary = ({ steps, activeStep }) => (
	<div className={styles.container}>
		{steps.map(step => (
			<div
				key={step.id}
				className={getClassNames(step, activeStep)}
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
			</div>
		))}
	</div>
);

StepSummary.propTypes = {
	steps: array.isRequired,
	activeStep: string.isRequired
};

export default StepSummary;
