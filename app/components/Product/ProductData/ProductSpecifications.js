import React, { PureComponent } from 'react';
import Slider from 'react-slick';
import _ from 'lodash';
import { CloseIcon, SpecificationIcon } from '../../UI/Icons';
import styles from './ProductSpecifications.scss';

type Props = {
	onToggleSpecifications: () => void,
	specifications: Array<{key: string, value: string}>,
	specificationsPerSlide: number
};

class ProductSpecifications extends PureComponent {
	props: Props

	static defaultProps = {
		specificationsPerSlide: 9
	}

	state = {
		currentSlide: 1
	}

	renderSpecificationSlides = (specifications, specificationsPerSlide) => {
		const chunkedSpecs = _.chunk(specifications, specificationsPerSlide);

		return chunkedSpecs.map((chunk, index) => (
			<div key={`slide-${index}`} className={styles.slide}>
				{chunk.map(spec => (
					<div key={spec.key} className={styles.specification}>
						<div className={styles.key}>
							{spec.key}
						</div>
						<div className={styles.value}>
							{spec.value}
						</div>
					</div>
				))}
			</div>
		));
	}

	render() {
		const { onToggleSpecifications, specifications, specificationsPerSlide } = this.props;
		const settings = {
			dots: true,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1
		};

		return (
			<div className={styles.container}>
				<div className={styles.specificationsHead}>
					<SpecificationIcon className={styles.specificationsHeadIcon} />

					<span className={styles.specificationsHeadText}>
						Especificaciones
					</span>

					<button
						className={styles.specificationsClose}
						onClick={onToggleSpecifications}
					>
						<CloseIcon />
					</button>
				</div>

				<div className={styles.specificationsBody}>
					<Slider {...settings} className="specifications">
						{this.renderSpecificationSlides(specifications, specificationsPerSlide)}
					</Slider>
				</div>
			</div>
		);
	}

}

export default ProductSpecifications;
