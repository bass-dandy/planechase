import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import PlaneswalkIcon from '../../planeswalk-icon';

export default function MainDeck(props) {
	return (
		<div className="main-deck">
			{_.get(props, 'deck.name')}
			<div className="card-container">
				<img src={_.get(props, 'deck.cards[0]', '../static/img/card-back.jpg')}/>
			</div>
			<IconButton
				className="deck-actions"
				onClick={_.get(props, 'deck.planeswalk')}
				disabled={!props.deck || props.deck.cards.length === 0}
			>
				<PlaneswalkIcon/>
			</IconButton>
			<IconButton
				className="deck-actions"
				onClick={_.get(props, 'deck.shuffle')}
				disabled={!props.deck || props.deck.cards.length === 0}
			>
				<Icon>shuffle</Icon>
			</IconButton>
			<IconButton
				className="deck-actions"
				onClick={() => props.pinCard(_.get(props, 'deck.cards[0]'))}
				disabled={!props.deck || props.deck.cards.length === 0}
			>
				<Icon>view_list</Icon>
			</IconButton>
		</div>
	);
}

MainDeck.propTypes = {
	deck: PropTypes.object,
	pinCard: PropTypes.func.isRequired
};
