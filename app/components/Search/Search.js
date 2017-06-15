import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { SearchInput } from '../UI/Input';
import { ProductList } from '../Product';
import styles from './Search.scss';

export default class Search extends PureComponent {
	static propTypes = {
		onFocusInput: PropTypes.func,
		searchResult: PropTypes.array,
		clearSearch: PropTypes.func,
		isKeyboardOpen: PropTypes.bool
	}

	static defaultProps = {
		onFocusInput: () => null,
		searchResult: [],
		clearSearch: () => null,
		isKeyboardOpen: true
	}

	state = {
		searchTerm: '',
		query: {},
		config: {
			productsPerPage: 3
		}
	}

	componentWillMount() {
		this.props.clearSearch();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isKeyboardOpen !== this.props.isKeyboardOpen) {
			this.setState({
				config: {
					productsPerPage: nextProps.isKeyboardOpen ? 3 : 6
				}
			});
		}
	}

	componentWillUnmount() {
		this.props.clearSearch();
	}

	search = _.debounce((term) => this.handleInputSearch(term), 1000)

	handleInputChange = (value: string) => {
		this.setState({
			searchTerm: value
		});

		if (value.length > 3) {
			// Call the debounced search method
			this.search(value);
		} else {
			// Reset search
			this.props.clearSearch();

			// Reset query state
			this.setState({
				query: {}
			});
		}
	}

	handleInputSearch = (value: string) => {
		// Set query state
		this.setState({
			query: {
				text: value,
				range: {
					from: 0,
					to: 5
				}
			}
		});
	}

	handleInputClear = () => {
		this.props.clearSearch();

		// Reset query state
		this.setState({
			searchTerm: '',
			query: {}
		});
	}

	render() {
		const { searchTerm, query, config } = this.state;
		const { onFocusInput, searchResult, isKeyboardOpen } = this.props;
		const activeSearchClassName = searchResult.length ? styles.activeSearchContainer : '';
		const productListClassName = isKeyboardOpen ? styles.productListHalf : styles.productListFull;

		return (
			<div className={`${styles.container} ${activeSearchClassName}`}>
				<div className={styles.inputContainer}>
					<SearchInput
						value={searchTerm}
						className={styles.input}
						onFocus={onFocusInput}
						onClear={this.handleInputClear}
						onChange={this.handleInputChange}
						onSearch={this.handleInputSearch}
					/>
				</div>

				<div className={styles.productsContainer}>
					{Object.keys(query).length > 0 &&
						<ProductList
							className={`${styles.productList} ${productListClassName}`}
							query={query}
							config={config}
						/>
					}
				</div>
			</div>
		);
	}
}
