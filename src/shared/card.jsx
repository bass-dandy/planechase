import React from 'react';

const EMPTY_CARD_URL = 'img/card-back.jpg';

export default function Card(props) {
	const src = props.imgUrl ? props.imgUrl : EMPTY_CARD_URL;
	return <img className="card" src={src} />;
}

Card.propTypes = {
	imgUrl: React.PropTypes.string
};
