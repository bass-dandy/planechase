import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {List, ListItem, ListItemText, Checkbox} from '@material-ui/core';
import CARDS from '../../cards.json';

export default function CardList(props) {
	return (
		<List className="card-list">
			{ _.map(props.selectedCards, (isChecked, cardId) => {
				return (
					<ListItem
						key={cardId}
						dense
						button
						onClick={() => props.onCheck(cardId)}
					>
						<Checkbox
							checked={isChecked}
							disableRipple
							tabIndex={-1}
						/>
						<ListItemText primary={CARDS[cardId].name}/>
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
