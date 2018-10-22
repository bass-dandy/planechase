import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import Vanilla from '../components/vanilla';

function VanillaContainer(props) {
	return (
		<Vanilla
			key={
				// force component to reinstantiate if a new deck is loaded
				_.get(props, 'selectedDeck.id', 'empty')
			}
			deck={props.selectedDeck}
		/>
	);
}

function mapStateToProps(state) {
	return {
		selectedDeck: state.decks.selectedDeck
	};
}

export default connect(mapStateToProps)(VanillaContainer);
