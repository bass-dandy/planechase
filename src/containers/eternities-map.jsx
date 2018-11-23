import React from 'react';
import {connect} from 'react-redux';

import EternitiesMap from '../components/eternities-map';
import NoDeckLoaded from '../components/no-deck-loaded';
import {actions} from '../redux/ducks/eternities-map';

function EternitiesMapContainer(props) {
	return props.deck ? (
		<EternitiesMap
			map={props.map}
			currentPos={props.currentPos}
			planeswalk={props.planeswalk}
		/>
	) : <NoDeckLoaded/>;
}

function mapStateToProps(state) {
	return {
		deck: state.decks.selectedDeck,
		map: state.eternitiesMap.map,
		currentPos: state.eternitiesMap.currentPos
	};
}

const mapDispatchToProps = {
	planeswalk: actions.planeswalk
};

export default connect(mapStateToProps, mapDispatchToProps)(EternitiesMapContainer);
