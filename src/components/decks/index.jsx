import React from 'react';
import PropTypes from 'prop-types';

import {Icon, IconButton} from '@material-ui/core';

import Deck from './partials/deck';

export default function Decks(props) {
	return (
		<div className="decks">
			<div className="decks-sidebar-control">
				<IconButton onClick={props.toggle}>
					<Icon>keyboard_arrow_left</Icon>
				</IconButton>
			</div>
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
	toggle: PropTypes.func.isRequired
};
