import React from 'react';
import {Button, Tooltip} from '@material-ui/core';

import ChaosIcon from '../../chaos-icon';
import PlaneswalkIcon from '../../planeswalk-icon';

export default class PlanarDie extends React.Component {

	state = {roll: 0}

	roll = () => {
		this.setState({
			roll: Math.floor(Math.random() * 6)
		});
	}

	render() {
		let face = '';
		if (this.state.roll === 0) {
			face = <PlaneswalkIcon fontSize="small"/>;
		} else if (this.state.roll === 5) {
			face = <ChaosIcon fontSize="small"/>;
		}

		return (
			<Tooltip placement="left" title="Roll Planar Die">
				<Button
					className="planar-die"
					onClick={this.roll}
					variant="contained"
					color="primary"
				>
					{face}
				</Button>
			</Tooltip>
		);
	}
}
