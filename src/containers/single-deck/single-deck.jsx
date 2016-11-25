import React from 'react';
import Card from '../../shared/card.jsx';

export default class SingleDeck extends React.Component {

	render() {
		return(
			<div className="single-deck">
				Single deck mode
				<Card imgUrl="img/planes/2009/bant.jpg"/>
			</div>
		);
	}
}

