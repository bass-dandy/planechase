import React from 'react';
import PropTypes from 'prop-types';

import {IconButton} from '@material-ui/core';
import {Menu as MenuIcon} from '@material-ui/icons';

import PlanarDie from './partials/planar-die';

export default function Nav(props) {
	return (
		<div className="nav">
			{ !props.sidebarOpen ? (
				<IconButton onClick={props.toggleSidebar}>
					<MenuIcon/>
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
