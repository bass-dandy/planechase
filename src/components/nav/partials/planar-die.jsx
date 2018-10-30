import React from 'react';
import {Tooltip} from '@material-ui/core';

import ChaosIcon from '../../chaos-icon';
import PlaneswalkIcon from '../../planeswalk-icon';

// time in ms it takes for the cube to do a full rotation when idle
const ROTATION_MS = 8000;

export default class PlanarDie extends React.Component {

	state = {
		roll: null,
		rotation: 0
	}

	roll = () => {
		this.setState({
			roll: Math.floor(Math.random() * 6)
		});
	}

	resetRoll = () => {
		this.rollResetTimeout = setTimeout(() => {
			this.setState({roll: null});
		}, 1000);
	}

	cancelResetRoll = () => {
		clearTimeout(this.rollResetTimeout);
	}

	getTransform = () => {
		// the y rotation just keeps incrementing when idle, so to prevent increasingly
		// wild spinning to/from rolls we base every roll's y rotation on the total spin count
		const baseY = Math.floor(this.state.rotation / 360) * 360;

		switch (this.state.roll) {
			case 0: return `rotateY(${baseY + 360}deg) rotateX(0deg)`;
			case 1: return `rotateY(${baseY + 180}deg) rotateX(0deg)`;
			case 2: return `rotateY(${baseY}deg) rotateX(90deg)`;
			case 3: return `rotateY(${baseY}deg) rotateX(-90deg)`;
			case 4: return `rotateY(${baseY + 90}deg) rotateX(0deg)`;
			case 5: return `rotateY(${baseY - 90}deg) rotateX(0deg)`;
			default: return `rotateY(${this.state.rotation}deg) rotateX(0deg)`;
		}
	}

	componentDidMount() {
		// we animate the idle rotation in js rather than css so that the transition
		// between it and any "rolled" rotation (as well as the reverse) will be seamless
		this.animationInterval = setInterval(() => {
			// stop idle rotation if the die is displaying a roll; this prevents us
			// from spinning too much to return to the idle animation if the die
			// is hovered for a long time, and also prevents a bug in getTransform()
			// where baseY changes each rotation and makes the die spin 360 degrees
			if (this.state.roll === null) {
				this.setState((state) => {
					return {
						rotation: state.rotation + 1
					};
				});
			}
		}, ROTATION_MS / 360);
	}

	componentWillUnmount() {
		clearInterval(this.animationInterval);
		clearTimeout(this.rollResetTimeout);
	}

	render() {
		return (
			<div className="planar-die-container">
				<Tooltip placement="left" title="Roll Planar Die">
					<button
						className="planar-die-button"
						onClick={this.roll}
						onMouseOut={this.resetRoll}
						onMouseOver={this.cancelResetRoll}
					/>
				</Tooltip>
				<div
					className="planar-die"
					style={{ transform: this.getTransform() }}
				>
					<div className="face front">
						<PlaneswalkIcon
							fontSize="small"
							className="planar-die-icon"
						/>
					</div>
					<div className="face back">
						<ChaosIcon
							fontSize="small"
							className="planar-die-icon"
						/>
					</div>
					<div className="face top"/>
					<div className="face bottom"/>
					<div className="face left"/>
					<div className="face right"/>
				</div>
			</div>
		);
	}
}
