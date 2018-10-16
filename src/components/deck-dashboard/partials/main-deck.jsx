import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {Icon, IconButton, Tooltip} from '@material-ui/core';

import PlaneswalkIcon from '../../planeswalk-icon';

export default function MainDeck(props) {
	return (
		<div className="main-deck">
			<div className="card-container">
				<img src={_.get(props, 'deck.cards[0].url', '../static/img/card-back.jpg')}/>
			</div>
			<Tooltip placement="bottom" title="Planeswalk">
				<IconButton
					className="deck-actions"
					onClick={_.get(props, 'deck.planeswalk')}
					disabled={!props.deck || props.deck.cards.length === 0}
				>
					<PlaneswalkIcon/>
				</IconButton>
			</Tooltip>
			<Tooltip placement="bottom" title="Shuffle">
				<IconButton
					className="deck-actions"
					onClick={_.get(props, 'deck.shuffle')}
					disabled={!props.deck || props.deck.cards.length === 0}
				>
					<Icon>shuffle</Icon>
				</IconButton>
			</Tooltip>
			<Tooltip placement="bottom" title="Pin Card">
				<IconButton
					className="deck-actions"
					onClick={() => props.pinCard(_.get(props, 'deck.cards[0]'))}
					disabled={!props.deck || props.deck.cards.length === 0}
				>
					<Icon>tab</Icon>
				</IconButton>
			</Tooltip>
		</div>
	);
}

MainDeck.propTypes = {
	deck: PropTypes.object,
	pinCard: PropTypes.func.isRequired
};
