import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default function Pinboard(props) {
	return (
		<div className="pinboard">
			{ _.map(props.cardUrls, (url) => {
				return (
					<img
						key={url}
						src={url}
						onClick={() => props.unpinCard(url)}
					/>
				);
			}) }
		</div>
	);
}

Pinboard.propTypes = {
	cardUrls: PropTypes.array.isRequired,
	unpinCard: PropTypes.func.isRequired
};
