import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Board from './partials/board';
import Pan from './partials/pan';
import Zoom from './partials/zoom';

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.5;
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
		mousePos: undefined,
		isMouseDown: false,
		isPanning: false,
		pan: {x: 0, y: 0}
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

	onMouseMove = (e) => {
		if (this.state.isMouseDown) {
			this.setState((state) => {
				return {
					isPanning: true,
					pan: {
						x: state.pan.x + e.movementX / this.state.scale,
						y: state.pan.y + e.movementY / this.state.scale
					}
				};
			});
		}
	}

	onMouseDown = (e) => {
		e.preventDefault();
		this.setState({isMouseDown: true});
	}

	onMouseUp = (e) => {
		this.setState({
			isMouseDown: false,
			isPanning: false
		});
	}

	componentDidMount() {
		document.addEventListener('mousemove', this.onMouseMove);
		document.addEventListener('mouseup', this.onMouseUp);
	}

	componentWillUnmount() {
		document.removeEventListener('mousemove', this.onMouseMove);
		document.removeEventListener('mouseup', this.onMouseUp);
	}

	render() {
		return (
			<div
				className={
					classnames('eternities-map', {panning: this.state.isPanning})
				}
				onWheel={this.onWheel}
				onMouseDown={this.onMouseDown}
			>
				<Zoom
					scale={this.state.scale}
					mousePos={this.state.mousePos}
				>
					<Pan pan={this.state.pan}>
						<Board
							map={this.props.map}
							currentPos={this.props.currentPos}
							planeswalk={this.props.planeswalk}
						/>
					</Pan>
				</Zoom>
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
