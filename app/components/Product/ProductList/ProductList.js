import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionMotion, spring } from 'react-motion';
import { ProductListItem } from '../';
import { searchQuery } from '../../../redux/modules/search';
import { Spinner } from '../../UI';
import { ChevronLeftIcon, ChevronRightIcon } from '../../UI/Icons';
import styles from './ProductList.scss';

class ProductList extends PureComponent {
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		query: PropTypes.object,
		config: PropTypes.object,
		onSearch: PropTypes.func.isRequired,
		canCompare: PropTypes.bool
	}

	static defaultProps = {
		className: '',
		style: {},
		config: {
			productsPerPage: 3
		},
		searchQuery: () => null,
		canCompare: false
	}

	state = {
		total: 0,
		currentPage: 1,
		loading: false,
		products: [],
		lastPageFetched: 1
	}

	componentWillMount() {
		this.search(this.props.query);
	}

	componentWillReceiveProps(nextProps) {
		// Call search if query changes
		if (nextProps.query !== this.props.query) {
			this.search(nextProps.query);
		}

		// Check if config has changed
		if (nextProps.config !== this.props.config) {
			// Check if the productsPerPage property has changed
			if (nextProps.config.productsPerPage !== this.props.config.productsPerPage) {
				const pages = Math.ceil(this.state.total / this.props.config.productsPerPage);
				const newPages = Math.ceil(this.state.total / nextProps.config.productsPerPage);
				const newCurrentPageFloat = (newPages / pages) * this.state.currentPage;
				let newCurrentPage = 1;

				switch (nextProps.config.productsPerPage) {
					case 3:
						newCurrentPage = Math.floor(newCurrentPageFloat);
						break;
					case 6:
						newCurrentPage = Math.round(newCurrentPageFloat);
						break;
					default:
						newCurrentPage = Math.round(newCurrentPageFloat);
				}

				this.setState({
					currentPage: newCurrentPage
				});
			}
		}
	}

	search = (query, clear = true) => {
		this.startLoading();

		return this.props.onSearch(query, clear)
			.then(res => this.handleSearchSuccess(res, clear))
			.catch(this.handleSearchReject);
	}

	startLoading = () => {
		this.setState({
			loading: true
		});
	}

	stopLoading = () => {
		this.setState({
			loading: false
		});
	}

	handleSearchSuccess = (response, clear) => {
		const { products } = this.state;
		const { headers } = response;
		const { resources } = headers;
		const total = parseInt(resources.split('/')[1], 10);
		const newProducts = clear ? response.data : products.concat(response.data);

		this.setState({
			total,
			products: newProducts,
			loading: false
		});
	}

	handleSearchReject = (err) => {
		console.error(err);
	}

	handlePrevControlClick = () => {
		const { currentPage } = this.state;

		this.setState({
			currentPage: currentPage - 1
		});
	}

	handleNextControlClick = () => {
		const fetchProductLength = 6;
		const { currentPage, lastPageFetched } = this.state;
		const { query } = this.props;
		const nextPage = currentPage + 1;
		const nextFetchPage = lastPageFetched + 1;

		if (currentPage >= lastPageFetched) {
			const newQueries = Object.assign({}, query, {
				range: {
					from: lastPageFetched * fetchProductLength,
					to: (nextFetchPage * fetchProductLength) - 1
				}
			});

			this.setState({
				loading: true,
				lastPageFetched: nextFetchPage
			});

			this.search(newQueries, false)
				.then(() => this.setState({	currentPage: nextPage }))
				.catch(console.error);
		} else {
			this.setState({
				currentPage: nextPage
			});
		}
	}

	willLeaveStyles = () => ({
		scale: spring(0),
		heihht: spring(0),
		width: spring(0),
		opacity: spring(0),
		translateY: spring(-15)
	})

	willEnterStyles = () => ({
		scale: 1.05,
		opacity: 0,
		width: 510,
		heihht: 302,
		translateY: -15
	})

	itemStyles = (products) => products.map(product => ({
		data: product,
		key: product.productId,
		style: {
			scale: spring(1),
			opacity: spring(1),
			width: 510,
			heihht: 302,
			translateY: spring(0)
		}
	}))

	render() {
		const { total, currentPage, loading, products } = this.state;
		const { className, style, config, canCompare } = this.props;
		const pages = Math.ceil(total / config.productsPerPage);
		const pageFirstIndex = (currentPage - 1) * config.productsPerPage;
		const pageLastIndex = currentPage * config.productsPerPage;
		const pageProducts = products.slice(pageFirstIndex, pageLastIndex);

		return (
			<div className={`${styles.container} ${className}`} style={style}>
				<TransitionMotion
					willEnter={this.willEnterStyles}
					styles={this.itemStyles(pageProducts)}
				>
					{interpolatedStyles => (
						<div className={styles.productsContainer}>
							{interpolatedStyles.map(item => (
								<ProductListItem
									key={item.key}
									product={item.data}
									style={{
										opacity: item.style.opacity,
										height: item.style.height,
										width: item.style.width,
										transform: `translateY(${item.style.translateY}px)`
									}}
									showCompare={canCompare}
								/>
							))}
						</div>
					)}
				</TransitionMotion>

				{products.length > 0 &&
					<div className={styles.controlsContainer}>
						<button
							className={styles.listPageControl}
							disabled={loading || currentPage === 1}
							onClick={this.handlePrevControlClick}
						>
							<ChevronLeftIcon className={styles.listPageControlIcon} />
						</button>

						<div className={styles.listPager}>
							<div
								className={styles.listPagerThumb}
								style={{
									width: `${Math.floor(100 / pages) || 1}%`,
									left: `${((currentPage - 1) * 100) / pages}%`
								}}
							/>
						</div>

						<button
							className={styles.listPageControl}
							disabled={loading || currentPage === pages}
							onClick={this.handleNextControlClick}
						>
							<ChevronRightIcon className={styles.listPageControlIcon} />
						</button>
					</div>
				}

				{loading &&
					<Spinner className={styles.loader} />
				}
			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		searchResult: state.search.searchResult
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onSearch: searchQuery
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
