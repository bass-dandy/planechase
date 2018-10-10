import React from 'react';
import PropTypes from 'prop-types';

export default function CardButton(props) {
	return (
		<button className="card-button">
			<img
				src={props.card || '../static/img/card-back.jpg'}
				onClick={props.onClick}
			/>
		</button>
	);
}

CardButton.propTypes = {
	card: PropTypes.string,
	onClick: PropTypes.func.isRequired
};
