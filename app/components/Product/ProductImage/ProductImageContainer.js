import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import {
	ProductDiscountPercent,
	ProductImage
} from './../UI';
import styles from './ProductImageContainer.scss';

const ProductImageContainer = ({ discount, images, activeImageIndex }) => (
	<div className={styles.imageContainer}>
		<ProductDiscountPercent
			className={styles.discount}
			style={{ visibility: discount === 0 ? 'hidden' : 'visible' }}
			discount={discount}
		/>

		<ProductImage
			className={styles.image}
			src={images[activeImageIndex].imageUrl}
		/>

		<div className={styles.thumbnails}>
			{images.map((image, index) => (
				<Motion
					key={image.imageId}
					defaultStyle={{ translateY: 0, opacity: 0, btnOpacity: 0 }}
					style={{
						translateY: activeImageIndex === index ? spring(0) : spring(100),
						opacity: activeImageIndex === index ? spring(1) : spring(0),
						btnOpacity: activeImageIndex === index ? spring(1) : spring(0.5)
					}}
				>
					{interpolatedStyles => (
						<button
							className={styles.thumbnail}
							style={{
								opacity: interpolatedStyles.btnOpacity
							}}
							onClick={() => this.setImageIndex(index)}
						>
							<ProductImage
								className={styles.thumbnailImage}
								src={image.imageUrl}
							/>

							<div
								className={styles.thumbnailActiveIndicator}
								style={{
									transform: `translateY(${interpolatedStyles.translateY}%)`,
									opacity: interpolatedStyles.opacity
								}}
							/>
						</button>
					)}
				</Motion>
			))}
		</div>
	</div>
);

ProductImageContainer.propTypes = {
	discount: PropTypes.number,
	images: PropTypes.array,
	activeImageIndex: PropTypes.number
};

ProductImageContainer.defaultProps = {
	discount: 0,
	images: [],
	activeImageIndex: 0
};

export default ProductImageContainer;
