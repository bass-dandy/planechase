import React from 'react';
import {Warning as WarningIcon} from '@material-ui/icons';

export default function NoDeckLoaded(props) {
	return (
		<div className="no-deck-loaded">
			<WarningIcon className="warning-icon"/>
			<strong>No deck loaded!</strong>
			Select a deck from the left sidebar and it will show up here.
		</div>
	);
}
