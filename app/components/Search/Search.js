// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Search.scss';
import { ProductListItem } from '../Product';
import { SearchInput } from '../UI/Input';

export default class Search extends PureComponent {
	static propTypes = {
		onFocusInput: PropTypes.func,
		searchTerm: PropTypes.func,
		searchResult: PropTypes.array,
		clearSearch: PropTypes.func
	}

	static defaultProps = {
		onFocusInput: () => null,
		searchTerm: () => null,
		searchResult: [],
		clearSearch: () => null
	}

	handleSearch = (term: string) => this.props.searchTerm(term)

	render() {
		const { onFocusInput, searchResult, clearSearch } = this.props;
		const activeSearchClassName = searchResult.length ? styles.activeSearchContainer : '';

		return (
			<div className={`${styles.container} ${activeSearchClassName}`}>
				<div className={styles.inputContainer}>
					<SearchInput
						className={styles.input}
						onFocus={onFocusInput}
						onSearch={this.handleSearch}
						onClear={clearSearch}
					/>
				</div>

				<div className={styles.productsContainer}>
					{searchResult.map(item => (
						<ProductListItem key={item.productId} product={item} />
					))}
				</div>
			</div>
		);
	}
}
