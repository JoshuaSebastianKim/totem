/* eslint global-require: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Category from './Category';
import { Button } from '../UI/Buttons';
import { ChevronLeftIcon, ChevronRightIcon } from '../UI/Icons';
import styles from './Categories.scss';

const categoryAssets = {
	Lavavajillas: {
		banner: require('../../images/cat_lavavajillas.png')
	},
	Heladeras: {
		banner: require('../../images/cat_heladeras.png')
	},
	Lavarropas: {
		banner: require('../../images/cat_lavarropas.png')
	},
	Cavas: {
		banner: require('../../images/cat_cavas.png')
	},
	Freezers: {
		banner: require('../../images/cat_freezers.png')
	},
	Cocinas: {
		banner: require('../../images/cat_cocinas.png')
	},
	'Colchones y Sommiers': {
		banner: require('../../images/cat_colchonesysommiers.png')
	},
	Cortacabellos: {
		banner: require('../../images/cat_cortacabellos.png')
	},
	Afeitadoras: {
		banner: require('../../images/cat_afeitadoras.png')
	},
	Depiladoras: {
		banner: require('../../images/cat_depiladoras.png')
	},
	Tablets: {
		banner: require('../../images/cat_tablets.png')
	},
	Notebooks: {
		banner: require('../../images/cat_notebooks.png')
	},
	Celulares: {
		banner: require('../../images/cat_celulares.png')
	},
	'TV Led': {
		banner: require('../../images/cat_tv.png')
	},
	'Parlantes Potenciados': {
		banner: require('../../images/cat_auriculares.png')
	},
	'Cintas Para Correr': {
		banner: require('../../images/cat_cintasparacorrer.png')
	},
	'Home GYM': {
		banner: require('../../images/cat_homegym.png')
	},
	'Bicicletas Fijas': {
		banner: require('../../images/cat_bicicletasfijas.png')
	},
	Elipticos: {
		banner: require('../../images/cat_elipticos.png')
	},
	'Camas Elásticas': {
		banner: require('../../images/cat_camaselasticas.png')
	},
	'Ping Pong': {
		banner: require('../../images/cat_pingpong.png')
	}
};

export default class Categories extends Component {
	static propTypes = {
		categoryTree: PropTypes.object.isRequired,
		match: PropTypes.object.isRequired,
		compareItems: PropTypes.array,
		removeCompareItem: PropTypes.func
	}

	static defaultProps = {
		compareItems: [],
		removeCompareItem: () => null
	}

	state = {
		currentSlide: 0,
		slideWidth: 488,
		translateX: 0,
		touchStart: 0,
		touchStartSlide: 0,
		isTouching: false
	}

	componentWillMount() {
		const { compareItems, removeCompareItem } = this.props;

		compareItems.forEach((item) => removeCompareItem(item.id));
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.categoryTree !== nextProps.categoryTree) {
			this.setState({
				currentSlide: 1,
				translateX: 0,
				isTouching: false
			});
		}
	}

	getSlideTranslateX = (slide) => {
		const { slideWidth } = this.state;

		return -(slide * slideWidth);
	}

	getTranslateXSlide = (translateX, minSlide = 0) => {
		const { children: categories } = this.props.categoryTree;
		const { slideWidth } = this.state;
		const lastSlide = categories.length - 2;
		let slide = Math.abs(Math.ceil(translateX / slideWidth));

		if (slide > lastSlide) {
			slide = lastSlide;
		}

		if (slide <= minSlide) {
			slide = 0;
		}

		return slide;
	}

	handlePrevControlClick = () => {
		const prevSlide = this.state.currentSlide - 1;

		this.setState({
			currentSlide: prevSlide,
			translateX: this.getSlideTranslateX(prevSlide)
		});
	}

	handleNextControlClick = () => {
		const nextSlide = this.state.currentSlide + 1;

		this.setState({
			currentSlide: nextSlide,
			translateX: this.getSlideTranslateX(nextSlide)
		});
	}

	handleTouchStart = (event) => {
		this.setState({
			isTouching: true,
			touchStart: Math.round(event.touches[0].clientX).toFixed(2),
			touchStartSlide: this.state.currentSlide
		});
	}

	handleTouchMove = (event) => {
		const { touchStart, touchStartSlide, slideWidth } = this.state;
		const distance = (touchStart - Math.round(event.touches[0].clientX)).toFixed(2);

		this.setState({
			currentSlide: touchStartSlide + (distance / slideWidth)
		});
	}

	handleTouchEnd = (event) => {
		const { children: categories } = this.props.categoryTree;
		const lastSlide = categories.length - 3;
		const { currentSlide } = this.state;
		let slide = Math.round(currentSlide);

		if (slide > lastSlide) {
			slide = lastSlide;
		}

		if (slide < 0) {
			slide = 0;
		}

		this.setState({
			isTouching: false,
			currentSlide: slide
		});
	}

	render() {
		const { categoryTree, match } = this.props;
		const { currentSlide, translateX, isTouching } = this.state;
		const categories = categoryTree.children;
		const lastSlide = categories.length - 2;

		console.log(currentSlide);

		return (
			<div className={styles.container}>
				<div
					className={`${styles.categorySlider} ${categories.length > 3 && styles.categorySliderPager}`}
					style={{
						transform: `translateX(${this.getSlideTranslateX(currentSlide)}px)`,
						transitionProperty: `${isTouching ? 'none' : 'transform'}`
					}}
					onTouchStart={this.handleTouchStart}
					onTouchMove={this.handleTouchMove}
					onTouchEnd={this.handleTouchEnd}
				>
					{categories.map(category => (
						<Link
							key={category.name}
							to={`${match.url}/${category.id}?path=${category.id}`}
							className={styles.categoryLink}
						>
							<Category
								name={category.name}
								bannerSrc={categoryAssets[category.name].banner}
							/>
						</Link>
					))}
				</div>

				{categories.length > 3 &&
					<div className={styles.categorySliderControls}>
						<Button
							className={styles.listPageControl}
							disabled={currentSlide <= 0}
							onClick={this.handlePrevControlClick}
						>
							<ChevronLeftIcon className={styles.listPageControlIcon} />
						</Button>

						<div className={styles.sliderPager}>
							<div
								className={styles.sliderPagerThumb}
								style={{
									width: `${Math.floor(100 / lastSlide) || 1}%`,
									left: `${(currentSlide * 100) / lastSlide}%`,
									transitionProperty: `${isTouching ? 'none' : 'left'}`
								}}
							/>
						</div>

						<Button
							className={styles.listPageControl}
							disabled={currentSlide >= lastSlide - 1}
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
