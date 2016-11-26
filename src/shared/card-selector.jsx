import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { actions } from '../modules/actions.js';
import Checkbox from './checkbox.jsx';

function CardCheckbox(props) {
	const label = _.chain(props.cardUrl)
		.split('/')
		.last()
		.replace('.jpg', '')
		.startCase()
		.value();

	return (
		<div className="card-checkbox">
			<Checkbox
				label={label}
				onChange={props.onChange}
				checked
			/>
		</div>
	);
}

CardCheckbox.propTypes = {
	cardUrl: React.PropTypes.string.isRequired,
	onChange: React.PropTypes.func.isRequired
};

class CardSelector extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			cardUrls: [],
			checkedCardUrls: []
		};
		this.setCardPool = this.setCardPool.bind(this);
	}

	componentDidMount() {
		const cardUrls = ['img/planes/2009/bant.jpg', 'img/planes/2012/glen-elendra.jpg'];

		this.setState({
			cardUrls: cardUrls,
			checkedCardUrls: _.clone(cardUrls)
		});
	}

	setCardPool() {
		this.props.setCardPool(this.state.checkedCardUrls);
	}

	render() {
		const cardCheckboxList = _.map(this.state.cardUrls, (url) => {
			const setChecked = (isChecked) => {
				let checkedCardUrls;
				if (isChecked) {
					checkedCardUrls = _.concat(this.state.checkedCardUrls, url);
				} else {
					checkedCardUrls = _.without(this.state.checkedCardUrls, url);
				}
				this.setState({checkedCardUrls});
			};

			return (
				<CardCheckbox
					cardUrl={url}
					key={url}
					onChange={setChecked}
				/>
			);
		});

		return (
			<div className="card-selector">
				{cardCheckboxList}
				<button onClick={this.setCardPool}>
					Apply
				</button>
			</div>
		);
	}
}

CardSelector.propTypes = {
	setCardPool: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		setCardPool(cardPool) {
			dispatch(actions.setCardPool(cardPool));
		}
	};
}

export default connect(null, mapDispatchToProps)(CardSelector);
