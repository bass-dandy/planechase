import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import { actions } from '../../../modules/actions.js';
import Checkbox from '../../../shared/checkbox.jsx';
import HttpClient from '../../../lib/http-client.js';

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
	cardUrl: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
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
		const httpClient = new HttpClient();
		httpClient.get('./api/card-urls', (err, res) => {
			const cardUrls = JSON.parse(res);
			this.setState({
				cardUrls: cardUrls,
				checkedCardUrls: _.clone(cardUrls)
			});
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
	setCardPool: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
	return {
		setCardPool(cardPool) {
			dispatch(actions.setCardPool(cardPool));
		}
	};
}

export default connect(null, mapDispatchToProps)(CardSelector);
