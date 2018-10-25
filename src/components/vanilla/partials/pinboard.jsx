import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import CardButton from '../../card-button';

export default function Pinboard(props) {
	return (
		<div className="pinboard">
			{ _.map(props.cards, (card) => {
				return (
					<CardButton
						key={card.name}
						card={card}
						onClick={() => {
							props.unpinCard(card);
							props.setHoveredPinnedCard(null);
						}}
						label="Return to Deck"
						onMouseEnter={() => props.setHoveredPinnedCard(card)}
						onMouseLeave={() => props.setHoveredPinnedCard(null)}
					/>
				);
			}) }
		</div>
	);
}

Pinboard.propTypes = {
	cards: PropTypes.array.isRequired,
	unpinCard: PropTypes.func.isRequired,
	setHoveredPinnedCard: PropTypes.func.isRequired
};
