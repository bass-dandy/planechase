import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { actions } from '../../modules/actions.js';
import CardSelector from './partials/card-selector.jsx';
import DropdownMenu from './partials/dropdown-menu.jsx';
import Modal from '../../shared/modal.jsx';

class Overlay extends React.Component {

	render() {
		return (
			<div>
				<DropdownMenu />
				<Modal
					close
					onClose={this.props.hideCardSelector}
					show={this.props.shouldShowCardSelector}
				>
					<CardSelector />
				</Modal>
			</div>
		);
	}
}

Overlay.propTypes = {
	hideCardSelector: React.PropTypes.func.isRequired,
	shouldShowCardSelector: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	return {
		shouldShowCardSelector: _.get(state, 'shouldShowCardSelector', [])
	};
}

function mapDispatchToProps(dispatch) {
	return {
		hideCardSelector() {
			dispatch(actions.hideCardSelector());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
