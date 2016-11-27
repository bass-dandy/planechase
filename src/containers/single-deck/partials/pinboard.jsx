import React from 'react';
import _ from 'lodash';

export default function Pinboard(props) {
	const pinnedCards = _.map(props.cards, (card) => {
		return (
			<div onClick={_.partial(props.unpin, card)}>
				{card}
			</div>
		);
	});

	return (
		<div className="pinboard">
			{pinnedCards}
		</div>
	);
}

Pinboard.propTypes = {
	cards: React.PropTypes.array.isRequired,
	unpin: React.PropTypes.func.isRequired
};
