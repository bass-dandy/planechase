import React from 'react';
import PropTypes from 'prop-types';

import PlanarDie from './partials/planar-die';
import PlanechaseIcon from '../planechase-icon';

export default function Nav(props) {
	return (
		<div className="nav">
			<div className="nav-title">
				<div className="nav-title-icon">
					<PlanechaseIcon/>
				</div>
				<h1 className="nav-title-text">
					Planechase
				</h1>
			</div>
			<div className="nav-content">
				{props.children}
			</div>
			<PlanarDie/>
		</div>
	);
}

Nav.propTypes = {
	children: PropTypes.node
};
