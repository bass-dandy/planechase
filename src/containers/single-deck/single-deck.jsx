import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Card from '../../shared/card.jsx';
import ControlPanel from './partials/control-panel.jsx';
import Pinboard from './partials/pinboard.jsx';

class SingleDeck extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			deck: [],
			pinned: []
		};
		this.planeswalk = this.planeswalk.bind(this);
		this.shuffle = this.shuffle.bind(this);
		this.pin = this.pin.bind(this);
		this.unpin = this.unpin.bind(this);
	}

	componentWillMount() {
		this.beginGame();
	}

	beginGame() {
		const cards = _.map(this.props.cardPool, (url) => {
			return <Card imgUrl={url} key={url} />;
		});

		this.setState({
			deck: _.shuffle(cards),
			pinned: []
		});
	}

	planeswalk() {
		const nextDeck = _.clone(this.state.deck);
		nextDeck.push(nextDeck.shift());
		this.setState({deck: nextDeck});
	}

	shuffle() {
		let nextDeck = _.tail(this.state.deck);
		nextDeck = _.shuffle(nextDeck);
		nextDeck.unshift(_.head(this.state.deck));
		this.setState({deck: nextDeck});
	}

	pin() {
		const nextDeck = _.clone(this.state.deck);
		const nextPinned = _.clone(this.state.pinned);
		nextPinned.push(nextDeck.shift());
		this.setState({
			deck: nextDeck,
			pinned: nextPinned
		});
	}

	unpin(card) {
		const nextDeck = _.concat(this.state.deck, card);
		const nextPinned = _.without(this.state.pinned, card);
		this.setState({
			deck: nextDeck,
			pinned: nextPinned
		});
	}

	render() {
		const revealedCard = this.state.deck.length > 0 ? _.head(this.state.deck) : <Card />

		return(
			<div className="single-deck">
				<div className="card-container">
					{revealedCard}
				</div>
				<ControlPanel
					disabled={this.state.deck.length <= 0}
					planeswalk={this.planeswalk}
					shuffle={this.shuffle}
					pin={this.pin}
				/>
				<Pinboard
					cards={this.state.pinned}
					unpin={this.unpin}
				/>
			</div>
		);
	}
}

SingleDeck.propTypes = {
	cardPool: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
	return {
		cardPool: _.get(state, 'cardPool', [])
	};
}

export default connect(mapStateToProps)(SingleDeck);
