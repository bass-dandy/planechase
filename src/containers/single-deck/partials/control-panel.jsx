import React from 'react';
import MaterialIcon from '../../../shared/material-icon.jsx';
import PlaneswalkerIcon from '../../../shared/planeswalker-icon.jsx';

export default function ControlPanel(props) {
	return (
		<div className="control-panel">
			<button onClick={props.pin} disabled={props.disabled}>
				<MaterialIcon name="add_to_photos" />
			</button>
			<button onClick={props.shuffle} disabled={props.disabled}>
				<MaterialIcon name="shuffle" />
			</button>
			<button onClick={props.planeswalk} disabled={props.disabled}>
				<PlaneswalkerIcon />
			</button>
		</div>
	);
}

ControlPanel.propTypes = {
	disabled: React.PropTypes.bool,
	planeswalk: React.PropTypes.func.isRequired,
	shuffle: React.PropTypes.func.isRequired,
	pin: React.PropTypes.func.isRequired
};

ControlPanel.defaultProps = {
	disabled: false
};
