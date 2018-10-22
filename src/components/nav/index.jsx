import React from 'react';
import PropTypes from 'prop-types';

import {IconButton, Icon} from '@material-ui/core';

import PlanarDie from './partials/planar-die';

export default function Nav(props) {
	return (
		<div className="nav">
			{ !props.sidebarOpen ? (
				<IconButton onClick={props.toggleSidebar}>
					<Icon>menu</Icon>
				</IconButton>
			) : null }
			<div className="nav-content">
				{props.children}
			</div>
			<PlanarDie/>
		</div>
	);
}

Nav.propTypes = {
	toggleSidebar: PropTypes.func.isRequired,
	sidebarOpen: PropTypes.bool,
	children: PropTypes.node
};
