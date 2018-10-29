import _ from 'lodash';

// get distance between two xy coordinates
export function getDistance(a, b) {
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// we can only planeswalk a distance of 1 space, unless we are going
// diagonally to an empty space aka hellriding bb 8)
export function canPlaneswalk(from, to, map) {
	const distance = getDistance(from, to);

	const isHellride = distance === 2 && !map[`${to.x},${to.y}`] && (
		(to.x === from.x - 1 && to.y === from.y - 1) ||
		(to.x === from.x + 1 && to.y === from.y - 1) ||
		(to.x === from.x + 1 && to.y === from.y + 1) ||
		(to.x === from.x - 1 && to.y === from.y + 1)
	);

	return distance === 1 || isHellride;
}

// convert string coordinate of form 'x,y' to an object of form {x: number, y: number}
export function getCoords(key) {
	const coords = _.split(key, ',');

	return {
		x: parseInt(coords[0]),
		y: parseInt(coords[1])
	};
}

// get the min/max x and y values in a map with coordinate keys of form 'x,y'
export function getExtremes(map) {
	return _.reduce(map, (acc, card, key) => {
		const coords = getCoords(key);

		acc.minX = coords.x < acc.minX ? coords.x : acc.minX;
		acc.minY = coords.y < acc.minY ? coords.y : acc.minY;

		acc.maxX = coords.x > acc.maxX ? coords.x : acc.maxX;
		acc.maxY = coords.y > acc.maxY ? coords.y : acc.maxY;

		return acc;
	}, {minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity});
}

// normalize coordinate so that the min x and min y values are 0
export function toBoardCoords(coords, extremes) {
	return {
		x: coords.x - extremes.minX,
		y: coords.y - extremes.minY
	};
}

// denormalize previously normalized coordinate
export function toMapCoords(coords, extremes) {
	return {
		x: coords.x + extremes.minX,
		y: coords.y + extremes.minY
	};
}
