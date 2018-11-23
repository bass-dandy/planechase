import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {List, ListSubheader, ListItem, ListItemText, Checkbox, RootRef} from '@material-ui/core';

export default class CardList extends React.PureComponent {

	static propTypes = {
		// an object of card group name to an array of cards in that group
		cardsByGroup: PropTypes.objectOf(
			PropTypes.arrayOf(PropTypes.object)
		).isRequired,
		selectedCards: PropTypes.objectOf(PropTypes.bool).isRequired,
		onSelectCard: PropTypes.func.isRequired,
		onCardHover: PropTypes.func.isRequired
	}

	// public method for resetting scroll to top of list
	resetScroll = () => {
		this.list.scrollTop = 0;
	}

	render() {
		return _.size(this.props.cardsByGroup) > 0 ? (
			<RootRef rootRef={(e) => { this.list = e; }}>
				<List className="card-list">
					{ _.map(this.props.cardsByGroup, (cards, group) => (
						<li key={`section-${group}`}>
							<ul className="card-sublist">
								<ListSubheader className="card-sublist-header">
									{_.startCase(group)}
								</ListSubheader>
								{ _.map(cards, (card) => (
									<ListItem
										key={card.id}
										className="card-list-item"
										dense
										button
										onClick={() => this.props.onSelectCard(card.id)}
										onMouseEnter={() => this.props.onCardHover(card)}
									>
										<Checkbox
											checked={this.props.selectedCards[card.id]}
											disableRipple
											tabIndex={-1}
										/>
										<ListItemText primary={card.name}/>
									</ListItem>
								)) }
							</ul>
						</li>
					)) }
				</List>
			</RootRef>
		) : 'No cards match the selected filters :^(';
	}
}
