/* eslint global-require: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
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
		match: PropTypes.object.isRequired
	}

	render() {
		const { categoryTree, match } = this.props;
		const categories = categoryTree.children;
		const settings = {
			dots: true,
			slidesToShow: 3,
			slidesToScroll: 1
		};

		return (
			<div className={styles.container}>
				<div
					className={`${styles.categorySlider} ${categories.length > 3 && styles.categorySliderPager}`}
				>
					{categories.length > 3 ?
						<Slider {...settings} className="categories">
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
						</Slider> :
						categories.map(category => (
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
						))
					}
				</div>

				{categories.length > 3 &&
					<div className={styles.categorySliderControls}>
						<Button
							className={styles.listPageControl}
							disabled={currentSlide === 1}
							onClick={this.handlePrevControlClick}
						>
							<ChevronLeftIcon className={styles.listPageControlIcon} />
						</Button>

						<div className={styles.sliderPager}>
							<div
								className={styles.sliderPagerThumb}
								style={{
									width: `${Math.floor(100 / lastSlide) || 1}%`,
									left: `${((currentSlide - 1) * 100) / lastSlide}%`
								}}
							/>
						</div>

						<Button
							className={styles.listPageControl}
							disabled={currentSlide === lastSlide}
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
