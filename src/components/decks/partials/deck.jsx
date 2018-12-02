import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import {IconButton, Tooltip} from '@material-ui/core';
import {Edit as EditIcon, DeleteForever as DeleteForeverIcon} from '@material-ui/icons';

import CardButton from '../../card-button';
import IsMobile from '../../is-mobile';

function Deck(props) {
	const {deck, selectedDeck, isMobile} = props;
	const selected = !_.isNil(selectedDeck) && _.get(selectedDeck, 'id') === deck.id;

	return (
		<div className="deck">
			<div className="deck-top-row">
				<div className="deck-name">
					{deck.name || '[no name]'}
				</div>
				<div className="deck-actions">
					<Tooltip placement="top" title="Edit">
						<IconButton
							className="deck-action"
							onClick={deck.edit}
						>
							<EditIcon fontSize={isMobile ? 'default' : 'small'}/>
						</IconButton>
					</Tooltip>
					<Tooltip placement="top" title="Delete">
						<IconButton
							className="deck-action"
							onClick={deck.remove}
						>
							<DeleteForeverIcon fontSize={isMobile ? 'default' : 'small'}/>
						</IconButton>
					</Tooltip>
				</div>
			</div>
			<CardButton
				className={classnames({selected})}
				card={_.get(deck, 'cards[0]')}
				onClick={deck.select}
				label="Use This Deck"
			/>
		</div>
	);
}

Deck.propTypes = {
	deck: PropTypes.object.isRequired,
	selectedDeck: PropTypes.object,
	isMobile: PropTypes.bool
};

export default IsMobile(Deck);
