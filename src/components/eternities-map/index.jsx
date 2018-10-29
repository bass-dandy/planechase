import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import CardButton from '../card-button';

import {
	getExtremes,
	toBoardCoords,
	toMapCoords,
	getCoords,
	canPlaneswalk
} from '../../lib/eternities-map';

function getBoard(map, extremes) {
	// Create a 2D array of null values that will fit all cards in the map densely.
	// It is much easier to render the board in row-major order, so Y comes first
	const board = _.times(
		extremes.maxY - extremes.minY + 1,
		() => _.times(extremes.maxX - extremes.minX + 1, () => null)
	);

	// Convert each card's map coordinates (which can be negative) to
	// board coordinates (which cannot) and put them on the board
	_.forEach(map, (card, key) => {
		const coords = toBoardCoords(
			getCoords(key),
			extremes
		);
		board[coords.y][coords.x] = card;
	});

	return board;
}

export default function EternitiesMap(props) {
	const extremes = getExtremes(props.map);
	const board = getBoard(props.map, extremes);

	return (
		<div className="eternities-map">
		{ _.map(board, (row, y) => (
			<div
				className="map-row"
				key={
					// we only care about the y in map coords here
					// (and we don't have an x in the outer loop)
					toMapCoords({x: 0, y}, extremes).y
				}
			>
			{ _.map(row, (card, x) => {
				const coords = toMapCoords({x, y}, extremes);
				const isCurrent = coords.x === props.currentPos.x && coords.y === props.currentPos.y;

				return (
					<div
						className={classnames('map-cell', {current: isCurrent})}
						key={coords.x}
					>
					{ card || canPlaneswalk(props.currentPos, coords, props.map) ? (
						<CardButton
							className={classnames({current: isCurrent})}
							card={card}
							onClick={() => props.planeswalk(coords.x, coords.y)}
							disabled={!canPlaneswalk(props.currentPos, coords, props.map)}
						/>
					) : null }
					</div>
				);
			}) }
			</div>
		)) }
		</div>
	);
}

EternitiesMap.propTypes = {
	map: PropTypes.object.isRequired,
	currentPos: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired
	}),
	planeswalk: PropTypes.func.isRequired
};

EternitiesMap.defaultProps = {
	map: {}
};
