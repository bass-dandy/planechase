import React from 'react';
import {connect} from 'react-redux';

import DeckBuilder from '../components/deck-builder';
import {actions as deckBuilderActions} from '../redux/ducks/deck-builder';
import {actions as decksActions} from '../redux/ducks/decks';

function DeckBuilderContainer(props) {
	return (
		<DeckBuilder
			open={props.open}
			deck={props.deck}
			addDeck={props.addDeck}
			onClose={props.closeDeckBuilder}
		/>
	);
}

function mapStateToProps(state) {
	return {
		open: state.deckBuilder.open,
		deck: state.deckBuilder.deck
	};
}

const mapDispatchToProps = {
	addDeck: decksActions.addDeck,
	closeDeckBuilder: deckBuilderActions.closeDeckBuilder
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckBuilderContainer);
