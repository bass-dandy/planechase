import React from 'react';
import MaterialIcon from '../../../shared/material-icon.jsx';
import PlaneswalkerIcon from '../../../shared/planeswalker-icon.jsx';

export default function ControlPanel(props) {
	return (
		<div className="control-panel">
			<button onClick={props.shuffle}>
				<MaterialIcon name="add_to_photos" />
			</button>
			<button onClick={props.shuffle}>
				<MaterialIcon name="shuffle" />
			</button>
			<button onClick={props.planeswalk}>
				<PlaneswalkerIcon />
			</button>
		</div>
	);
}

ControlPanel.propTypes = {
	planeswalk: React.PropTypes.func.isRequired,
	shuffle: React.PropTypes.func.isRequired
};
