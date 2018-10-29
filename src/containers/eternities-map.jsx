import React from 'react';
import {connect} from 'react-redux';

import EternitiesMap from '../components/eternities-map';
import {actions} from '../redux/ducks/eternities-map';

function EternitiesMapContainer(props) {
	return (
		<EternitiesMap
			map={props.map}
			currentPos={props.currentPos}
			planeswalk={props.planeswalk}
		/>
	);
}

function mapStateToProps(state) {
	return {
		map: state.eternitiesMap.map,
		currentPos: state.eternitiesMap.currentPos
	};
}

const mapDispatchToProps = {
	planeswalk: actions.planeswalk
};

export default connect(mapStateToProps, mapDispatchToProps)(EternitiesMapContainer);
