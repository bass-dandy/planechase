import React from 'react';
import PropTypes from 'prop-types';

const EMPTY_CARD_URL = 'static/img/card-back.jpg';

export default function Card(props) {
	const src = props.imgUrl ? props.imgUrl : EMPTY_CARD_URL;
	return <img className="card" src={src} />;
}

Card.propTypes = {
	imgUrl: PropTypes.string
};
