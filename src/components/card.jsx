import React from 'react';

export default function Card(props) {
	return (
		<img className="card" src={props.imgUrl} />
	);
}

Card.propTypes = {
	imgUrl: React.PropTypes.string.isRequired
};

