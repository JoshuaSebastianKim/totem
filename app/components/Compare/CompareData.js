import React, { PureComponent } from 'react';
import Slider from 'react-slick';
import _ from 'lodash';
import { Button } from '../UI/Buttons';
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '../UI/Icons';
import styles from './CompareData.scss';

type Props = {
	products: Array<any>,
	specsPerCol: number
};

class CompareData extends PureComponent {
	props: Props

	static defaultProps = {
		specsPerCol: 5
	}

	state = {
		sliderRef: null,
		currentSlide: 0
	}

	getSpecificationNames = (products) => {
		const specificationNames = _.uniq(_.flatten(products.map(p => p.allSpecifications)));

		return specificationNames;
	}

	getChukedSpecifications = (products) => {
		const { specsPerCol } = this.props;
		const specificationNames = this.getSpecificationNames(products);
		const chukedSpecNames = _.chunk(specificationNames, specsPerCol);

		return chukedSpecNames;
	}

	setSliderRef = (slider) => {
		this.setState({
			sliderRef: slider
		});
	}

	handlePrevControlClick = () => {
		this.state.sliderRef.slickPrev();
	}

	handleNextControlClick = () => {
		this.state.sliderRef.slickNext();
	}

	handleSliderChange = (currentSlide) => {
		this.setState({
			currentSlide
		});
	}

	render() {
		const { products } = this.props;
		const { sliderRef, currentSlide } = this.state;
		const chunkedSpecifications = this.getChukedSpecifications(products);
		const settings = {
			arrows: false,
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			afterChange: this.handleSliderChange
		};

		return (
			<div className={styles.container}>
				<Slider
					{...settings}
					className="compare"
					ref={this.setSliderRef}
				>
					{chunkedSpecifications.map((specificationNames, i) => (
						<div key={i} className={styles.slide}>
							<div className={styles.specificationNames}>
								{specificationNames.map(specName => (
									<div key={specName} className={styles.name}>
										{specName}
									</div>
								))}
							</div>

							{products.map((product, ii) => (
								<div key={`${product.productId}-${ii}`} className={styles.product}>
									{specificationNames.map(specName => (
										<div key={specName} className={styles.value}>
											{specName in product
												? product[specName].join(', ')
												: '-'
											}
										</div>
									))}
								</div>
							))}
						</div>
					))}
				</Slider>

				{sliderRef &&
					<div className={styles.sliderControls}>
						<Button
							className={styles.listPageControl}
							disabled={currentSlide === 0}
							onClick={this.handlePrevControlClick}
						>
							<ChevronLeftIcon className={styles.listPageControlIcon} />
						</Button>

						<div className={styles.pager}>
							<div className={styles.sliderPager}>
								<div
									className={styles.sliderPagerThumb}
									style={{
										width: `${Math.floor(100 / chunkedSpecifications.length) || 1}%`,
										left: `${((currentSlide) * 100) / chunkedSpecifications.length}%`
									}}
								/>
							</div>

							<div className={styles.sliderPagerHelp}>
								<span className={styles.label}>
									Deslice para ver más información
								</span>
								<ArrowRightIcon className={styles.icon} />
							</div>
						</div>

						<Button
							className={styles.listPageControl}
							disabled={currentSlide === chunkedSpecifications.length - 1}
							onClick={this.handleNextControlClick}
						>
							<ChevronRightIcon className={styles.listPageControlIcon} />
						</Button>
					</div>
				}
			</div>
		);
	}

}

export default CompareData;
