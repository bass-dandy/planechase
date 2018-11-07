import React from 'react';
import PropTypes from 'prop-types';

import Board from './partials/board';
import Transform from './partials/transform';

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_SCALE_FACTOR = 0.0025;

function clamp(val, min, max) {
	return Math.min(
		Math.max(val, min),
		max
	);
}

export default class EternitiesMap extends React.Component {

	state = {
		scale: 1,
		mousePos: undefined
	}

	onWheel = (e) => {
		e.preventDefault();
		e.persist();

		this.setState((state) => {
			return {
				scale: clamp(
					state.scale - (e.deltaY * ZOOM_SCALE_FACTOR),
					MIN_ZOOM,
					MAX_ZOOM
				),
				mousePos: {
					x: e.clientX,
					y: e.clientY
				}
			};
		});
	}

	render() {
		return (
			<div
				className="eternities-map"
				onWheel={this.onWheel}
			>
				<Transform
					scale={this.state.scale}
					mousePos={this.state.mousePos}
				>
					<Board
						map={this.props.map}
						currentPos={this.props.currentPos}
						planeswalk={this.props.planeswalk}
					/>
				</Transform>
			</div>
		);
	}
}

EternitiesMap.propTypes = {
	map: PropTypes.object.isRequired,
	currentPos: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired
	}),
	planeswalk: PropTypes.func.isRequired
};
