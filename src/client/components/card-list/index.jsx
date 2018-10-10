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
			{ _.map(props.cards, (isChecked, card) => {
				return (
					<ListItem
						key={card}
						dense
						button
						onClick={() => props.onCheck(card)}
					>
						<Checkbox
							checked={isChecked}
							disableRipple
							tabIndex={-1}
						/>
						<ListItemText primary={_.startCase(_.last(card.replace('.jpg', '').split('/')))}/>
					</ListItem>
				);
			}) }
		</List>
	);
}

CardList.propTypes = {
	cards: PropTypes.object,
	onCheck: PropTypes.func.isRequired
};
