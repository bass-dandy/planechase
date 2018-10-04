import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import MaterialIcon from '../../../shared/material-icon.jsx';

export default function Pinboard(props) {
	const pinnedCards = _.map(props.cards, (card, i) => {
		return (
			// using index as key here is okay since these cannot be reordered
			<div className="pinned-card" key={i}>
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
	cards: PropTypes.array.isRequired,
	unpin: PropTypes.func.isRequired
};
