import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import _ from 'lodash';
import { CloseButton } from '../../UI/Buttons';
import { ProductImage } from '../../Product/UI';
import styles from './CompareBar.scss';

class CompareBar extends PureComponent {
	static propTypes = {
		items: PropTypes.array,
		onRemoveItem: PropTypes.func
	}

	static defaultProps = {
		items: [],
		onRemoveItem: () => null
	}

	handleRemoveItem = (itemId) => this.props.onRemoveItem(itemId);

	render() {
		const { items } = this.props;

		return (
			<Motion
				defaultStyles={{
					translateY: 100
				}}
				style={{
					translateY: items.length > 0 ? spring(0) : spring(100)
				}}
			>
				{interpolatedStyles => (
					<div
						className={styles.containerFixed}
						style={{
							transform: `translateY(${interpolatedStyles.translateY}%)`
						}}
					>
						<div className={styles.container}>
							<div className={styles.compareItems}>
								{items.map(item => (
									<div key={item.id} className={styles.compareItem}>
										<div className={styles.compareItemRemove}>
											<CloseButton
												className={styles.compareItemRemoveButton}
												iconSize={13}
												onClick={() => this.handleRemoveItem(item.id)}
											/>
										</div>
										<ProductImage src={item.image} className={styles.compareItemImage} />
									</div>
								))}

								{_.range(4 - items.length).map((value) => (
									<div key={value} className={styles.compareItemPlaceholder}>
										AGREGA UN PRODUCTO
									</div>
								))}
							</div>

							<div className={styles.compareActions}>
								<Link
									to="/compare"
									className={`${styles.compareButton} ${items.length < 2 ? styles.compareButtonDisabled : ''}`}
									onClick={e => {
										if (items.length < 2) {
											e.preventDefault();
										}
									}}
								>
									<span className={styles.compareButtonLabel}>
										COMPARAR PRODUCTOS
									</span>
								</Link>
							</div>
						</div>
					</div>
				)}
			</Motion>
		);
	}
}

export default CompareBar;
