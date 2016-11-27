import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Card from '../../shared/card.jsx';
import ControlPanel from './partials/control-panel.jsx';

class SingleDeck extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			deck: []
		};
		this.planeswalk = this.planeswalk.bind(this);
		this.shuffle = this.shuffle.bind(this);
	}

	componentWillMount() {
		this.beginGame();
	}

	beginGame() {
		const cards = _.map(this.props.cardPool, (url) => {
			return <Card imgUrl={url} key={url} />;
		});

		this.setState({
			deck: _.shuffle(cards)
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

	render() {
		return(
			<div className="single-deck">
				<div className="card-container">
					{_.head(this.state.deck)}
				</div>
				<ControlPanel
					planeswalk={this.planeswalk}
					shuffle={this.shuffle}
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
