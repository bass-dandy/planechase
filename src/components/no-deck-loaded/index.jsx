import React from 'react';
import {Icon} from '@material-ui/core';

export default function NoDeckLoaded(props) {
	return (
		<div className="no-deck-loaded">
			<Icon className="warning-icon">warning</Icon>
			<strong>No deck loaded!</strong>
			Select a deck from the left sidebar and it will show up here.
		</div>
	);
}
