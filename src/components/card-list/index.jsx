import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export default function CardList(props) {
	return (
		<List className="card-list">
			{ _.map(props.selectedCards, (isChecked, cardName) => {
				return (
					<ListItem
						key={cardName}
						dense
						button
						onClick={() => props.onCheck(cardName)}
					>
						<Checkbox
							checked={isChecked}
							disableRipple
							tabIndex={-1}
						/>
						<ListItemText primary={cardName}/>
					</ListItem>
				);
			}) }
		</List>
	);
}

CardList.propTypes = {
	selectedCards: PropTypes.object,
	onCheck: PropTypes.func.isRequired
};
