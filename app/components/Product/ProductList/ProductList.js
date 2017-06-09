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
		pages: 0,
		currentPage: 1,
		loading: false,
		products: [],
		lastPageFetched: 1
	}

	componentWillMount() {
		this.search(this.props.query);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.query !== this.props.query) {
			this.search(nextProps.query);
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
		const { currentPage, lastPageFetched } = this.state;
		const { query } = this.props;
		const nextPage = currentPage + 1;

		if (nextPage > lastPageFetched) {
			const newQueries = Object.assign({}, query, {
				range: {
					from: currentPage * 6,
					to: (nextPage * 6) - 1
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
