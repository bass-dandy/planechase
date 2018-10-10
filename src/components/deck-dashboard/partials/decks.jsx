import React from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Deck from './deck';

export default function Decks(props) {
	return (
		<div className="decks">
			<div className="decks-title">
				Planar Decks
				<IconButton
					className="add-deck"
					onClick={props.addDeck}
				>
					<Icon>add_circle</Icon>
				</IconButton>
			</div>
			<div className="decks-list">
				{ props.decks.map((deck) => {
					return (
						<Deck
							key={deck.id}
							deck={deck}
							setMainDeckId={props.setMainDeckId}
						/>
					);
				}) }
			</div>
		</div>
	);
}

Decks.propTypes = {
	decks: PropTypes.arrayOf(PropTypes.object).isRequired,
	addDeck: PropTypes.func.isRequired,
	setMainDeckId: PropTypes.func.isRequired
};
