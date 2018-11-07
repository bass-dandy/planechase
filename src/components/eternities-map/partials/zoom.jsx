import React from 'react';
import PropTypes from 'prop-types';

import Matrix from '../../../lib/matrix';

export default class Zoom extends React.Component {

	static propTypes = {
		scale: PropTypes.number.isRequired,
		mousePos: PropTypes.shape({
			x: PropTypes.number.isRequired,
			y: PropTypes.number.isRequired
		}).isRequired,
		children: PropTypes.node
	}

	static defaultProps = {
		scale: 1,
		mousePos: {x: 0, y: 0}
	}

	matrix = new Matrix()

	// returns mouse position (given in screen-space) relative to the Transform element
	getZoomPos = () => {
		const zoomPos = {
			x: this.props.mousePos.x - this.ref.offsetLeft,
			y: this.props.mousePos.y - this.ref.offsetTop
		};

		let offsetParent = this.ref.offsetParent;

		while (offsetParent) {
			zoomPos.x -= offsetParent.offsetLeft;
			zoomPos.y -= offsetParent.offsetTop;
			offsetParent = offsetParent.offsetParent;
		}
		return zoomPos;
	}

	render() {
		const style = {};

		// we need to render the component before we can get its bounding rect
		if (this.ref) {
			const zoomPos = this.getZoomPos();

			const prevScale = this.matrix.getCurrentScale();
			const scale = this.props.scale / prevScale;

			// translations will be applied in reverse order
			this.matrix
				.translate(-zoomPos.x, -zoomPos.y)
				.scale(scale)
				.translate(zoomPos.x, zoomPos.y);

			style.transform = this.matrix.toCssMatrix();
		}

		return (
			<div
				className="eternities-map-zoom"
				style={style}
				ref={(e) => { this.ref = e; }}
			>
				{this.props.children}
			</div>
		);
	}
}
