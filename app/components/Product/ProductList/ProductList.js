import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProductListItem } from '../';
import { searchQuery } from '../../../redux/modules/search';
import { ChevronLeftIcon, ChevronRightIcon } from '../../UI/Icons';
import styles from './ProductList.scss';

class ProductList extends PureComponent {
	static propTypes = {
		className: PropTypes.string,
		style: PropTypes.object,
		query: PropTypes.object,
		config: PropTypes.object,
		onSearch: PropTypes.func.isRequired
	}

	static defaultProps = {
		className: '',
		style: {},
		config: {
			productsPerPage: 3
		},
		searchQuery: () => null
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
				const newCurrentPage = Math.round(newCurrentPageFloat);

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
		const { currentPage, lastPageFetched, total } = this.state;
		const { query } = this.props;
		const pages = Math.ceil(total / fetchProductLength);
		const nextPage = currentPage + 1;
		const nextFetchPage = lastPageFetched + 1;

		if (pages > lastPageFetched) {
			const newQueries = Object.assign({}, query, {
				range: {
					from: lastPageFetched * fetchProductLength,
					to: (nextFetchPage * fetchProductLength) - 1
				}
			});

			this.setState({
				loading: true,
				lastPageFetched: nextPage
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
		const { className, style, config } = this.props;
		const pages = Math.ceil(total / config.productsPerPage);
		const pageFirstIndex = (currentPage - 1) * config.productsPerPage;
		const pageLastIndex = currentPage * config.productsPerPage;
		const pageProducts = products.slice(pageFirstIndex, pageLastIndex);

		return (
			<div className={`${styles.container} ${className}`} style={style}>
				<div className={styles.productsContainer}>
					{pageProducts.map((product) => (
						<ProductListItem key={product.productId} product={product} />
					))}
				</div>

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
									width: `${Math.floor(100 / pages)}%`,
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