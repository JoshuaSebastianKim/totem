import React from 'react';
import { string, bool } from 'prop-types';

import { getSVGFromSource, extractSVGProps } from './util';

export default class InlineSVG extends React.Component {
	render() {
		let Element;
		let	__html;
		let svgProps;
		const {
			element,
			raw,
			src,
			...otherProps
		} = this.props;

		if (raw === true) {
			Element = 'svg';
			svgProps = extractSVGProps(src);
			__html = getSVGFromSource(src).innerHTML;
		}
		__html = __html || src;
		Element = Element || element;
		svgProps = svgProps || {};

		return (
			<Element
				{...svgProps}
				{...otherProps}
				src={null}
				dangerouslySetInnerHTML={{
					__html
				}}
			/>
		);
	}
}

InlineSVG.defaultProps = {
	element: 'i',
	raw: false,
	src: ''
};

InlineSVG.propTypes = {
	src: string.isRequired,
	element: string,
	raw: bool
};
