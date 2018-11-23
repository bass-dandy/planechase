import React from 'react';
import PropTypes from 'prop-types';

import VanillaDeck from './partials/vanilla-deck';
import Pinboard from './partials/pinboard';

export default class Vanilla extends React.Component {

	static propTypes = {
		deck: PropTypes.object.isRequired,
		pinCard: PropTypes.func.isRequired,
		unpinCard: PropTypes.func.isRequired,
		planeswalk: PropTypes.func.isRequired,
		shuffle: PropTypes.func.isRequired
	}

	state = {
		hoveredPinnedCard: null
	}

	setHoveredPinnedCard = (card) => {
		this.setState({hoveredPinnedCard: card});
	}

	render() {
		return (
			<>
				<VanillaDeck
					cards={this.props.deck.deckCards}
					planeswalk={this.props.planeswalk}
					shuffle={this.props.shuffle}
					pinCard={this.props.pinCard}
					topCardOverride={this.state.hoveredPinnedCard}
				/>
				<Pinboard
					cards={this.props.deck.pinnedCards}
					unpinCard={this.props.unpinCard}
					setHoveredPinnedCard={this.setHoveredPinnedCard}
				/>
			</>
		);
	}
}
