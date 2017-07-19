import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { string, object, func, bool, array } from 'prop-types';
import { connect } from 'react-redux';
import { ProductListItem } from '../';
import { searchQuery, searchFulfilled, storeLastCurrentPageState } from '../../../redux/modules/search';
import { Spinner } from '../../UI';
import { Button } from '../../UI/Buttons';
import { ChevronLeftIcon, ChevronRightIcon } from '../../UI/Icons';
import styles from './ProductList.scss';

class ProductList extends PureComponent {
	static propTypes = {
		className: string,
		style: object,
		query: object.isRequired,
		config: object,
		onSearch: func.isRequired,
		canCompare: bool,
		lastCurrentPageState: object,
		storeLastCurrentPageState: func,
		locationHistoryStack: array,
		onSearchFulfilled: func,
		isCompareActive: bool
	}

	static defaultProps = {
		className: '',
		style: {},
		config: {
			productsPerPage: 3
		},
		searchQuery: () => null,
		canCompare: false,
		lastCurrentPageState: {},
		storeLastCurrentPageState: () => null,
		locationHistoryStack: [],
		onSearchFulfilled: () => null,
		isCompareActive: false
	}

	state = {
		total: 0,
		currentPage: 1,
		loading: false,
		products: [],
		lastPageFetched: 1
	}

	componentWillMount() {
		const { locationHistoryStack, lastCurrentPageState, onSearchFulfilled } = this.props;
		const { text: queryText } = this.props.query;
		const { text: lastQueryText } = lastCurrentPageState.props.query;
		const [currentLocation, lastLocation] = locationHistoryStack;

		// Set currentPage and products state as the lastCurrentPageState prop if lastLocation prop
		// matches the '/product' regexp
		// TODO: find a way to keep this DRY
		if (/\/product/.test(lastLocation) && currentLocation === locationHistoryStack[2]) {
			// Different logic needed depending of the currentLocation
			if (/\/search/.test(currentLocation)) {
				if (queryText && (queryText === lastQueryText)) {
					this.setState({
						...lastCurrentPageState.state
					});

					if (lastCurrentPageState.state.products) {
						onSearchFulfilled(lastCurrentPageState.state.products);
					}
				} else {
					this.search(this.props.query);
				}
			} else {
				this.setState({
					...lastCurrentPageState.state
				});

				if (lastCurrentPageState.state.products) {
					onSearchFulfilled(lastCurrentPageState.state.products);
				}
			}
		} else {
			this.search(this.props.query);
		}
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

	componentWillUnmount() {
		const { query, config } = this.props;
		const { currentPage, products, lastPageFetched, total } = this.state;

		this.props.storeLastCurrentPageState({
			props: {
				query,
				config
			},
			state: {
				currentPage,
				lastPageFetched,
				products,
				total
			}
		});
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

	render() {
		const { total, currentPage, loading, products } = this.state;
		const { className, style, config, canCompare, isCompareActive } = this.props;
		const pages = Math.ceil(total / config.productsPerPage);
		const pageFirstIndex = (currentPage - 1) * config.productsPerPage;
		const pageLastIndex = currentPage * config.productsPerPage;
		const pageProducts = products.slice(pageFirstIndex, pageLastIndex);

		return (
			<div className={`${styles.container} ${className}`} style={style}>
				<div className={styles.productsContainer}>
					{pageProducts.map(product => (
						<ProductListItem
							key={product.productId}
							product={product}
							showCompare={canCompare}
						/>
					))}
				</div>

				{products.length > 0 &&
					<div className={styles.controlsContainer}>
						<Button
							className={styles.listPageControl}
							disabled={loading || currentPage === 1}
							onClick={this.handlePrevControlClick}
						>
							<ChevronLeftIcon className={styles.listPageControlIcon} />
						</Button>

						<div className={`${styles.listPager} ${isCompareActive ? styles.compareListPage : ''}`}>
							<div
								className={styles.listPagerThumb}
								style={{
									width: `${Math.floor(100 / pages) || 1}%`,
									left: `${((currentPage - 1) * 100) / pages}%`
								}}
							/>
						</div>

						<Button
							className={styles.listPageControl}
							disabled={loading || currentPage === pages}
							onClick={this.handleNextControlClick}
						>
							<ChevronRightIcon className={styles.listPageControlIcon} />
						</Button>
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
		lastCurrentPageState: state.search.lastCurrentPageState,
		locationHistoryStack: state.history.locationHistoryStack
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		onSearch: searchQuery,
		onSearchFulfilled: searchFulfilled,
		storeLastCurrentPageState
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
