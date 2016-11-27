import React from 'react';

export default function Card(props) {
	const src = props.imgUrl ? props.imgUrl : 'img/card-back.jpg';
	return <img className="card" src={src} />;
}

Card.propTypes = {
	imgUrl: React.PropTypes.string
};

