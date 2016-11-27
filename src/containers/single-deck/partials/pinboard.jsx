import React from 'react';
import _ from 'lodash';

import MaterialIcon from '../../../shared/material-icon.jsx';

export default function Pinboard(props) {
	const pinnedCards = _.map(props.cards, (card) => {
		return (
			<div className="pinned-card">
				<button
					className="unpin-card"
					onClick={_.partial(props.unpin, card)}
				>
					<MaterialIcon name="remove" />
				</button>
				{card}
			</div>
		);
	});

	const pinboard = (
		<div className="pinboard">
			<div className="header">
				Pinned Cards
			</div>
			<div className="pinned-cards">
				{pinnedCards}
			</div>
		</div>
	);

	return props.cards.length > 0 ? pinboard : null;
}

Pinboard.propTypes = {
	cards: React.PropTypes.array.isRequired,
	unpin: React.PropTypes.func.isRequired
};
