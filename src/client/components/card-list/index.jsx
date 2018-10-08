import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

export default function CardList(props) {
	return (
		<List className="card-list">
			{ _.map(props.cardUrls, (isChecked, url) => {
				return (
					<ListItem
						key={url}
						dense
						button
						onClick={() => props.onCheck(url)}
					>
						<Checkbox
							checked={isChecked}
							disableRipple
							tabIndex={-1}
						/>
						<ListItemText primary={_.startCase(_.last(url.replace('.jpg', '').split('/')))}/>
					</ListItem>
				);
			}) }
		</List>
	);
}

CardList.propTypes = {
	cardUrls: PropTypes.object,
	onCheck: PropTypes.func.isRequired
};
