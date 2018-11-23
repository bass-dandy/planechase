import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Vanilla from '../components/vanilla';
import NoDeckLoaded from '../components/no-deck-loaded';
import {actions} from '../redux/ducks/vanilla';

function VanillaContainer(props) {
	return props.deck ? (
		<Vanilla
			deck={props.deck}
			pinCard={() => props.pinCard(props.deck.id)}
			unpinCard={(card) => props.unpinCard(props.deck.id, card)}
			planeswalk={() => props.planeswalk(props.deck.id)}
			shuffle={() => props.shuffle(props.deck.id)}
		/>
	) : <NoDeckLoaded/>;
}

function mapStateToProps(state) {
	const selectedDeckId = _.get(state, 'decks.selectedDeck.id');

	return {
		deck: _.get(state, `vanilla.decks.${selectedDeckId}`)
	};
}

const mapDispatchToProps = {
	pinCard: actions.pinCard,
	unpinCard: actions.unpinCard,
	planeswalk: actions.planeswalk,
	shuffle: actions.shuffle
};

export default connect(mapStateToProps, mapDispatchToProps)(VanillaContainer);
