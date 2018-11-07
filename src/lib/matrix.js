import _ from 'lodash';

function transpose(m) {
	return [
		m[0], m[3], m[6],
		m[1], m[4], m[7],
		m[2], m[5], m[8]
	];
}

export default function Matrix() {
	// default to identity matrix; matrix is stored row-major
	this.matrix = [
		1, 0, 0,
		0, 1, 0,
		0, 0, 1
	];
}

Matrix.prototype.multiply = function(lhs) {
	const rhs = transpose(this.matrix);

	const lhsRows = _.chunk(lhs, 3);
	const rhsCols = _.chunk(rhs, 3);

	const result = [];

	_.forEach(lhsRows, (row) => {
		_.forEach(rhsCols, (col) => {
			result.push(row[0] * col[0] + row[1] * col[1] + row[2] * col[2]);
		});
	});

	this.matrix = result;
};

Matrix.prototype.scale = function(scale) {
	const scalingMatrix = [
		scale, 0, 0,
		0, scale, 0,
		0, 0, 1
	];
	this.multiply(scalingMatrix);
	return this;
};

Matrix.prototype.translate = function(x, y) {
	const translationMatrix = [
		1, 0, x,
		0, 1, y,
		0, 0, 1
	];
	this.multiply(translationMatrix);
	return this;
};

Matrix.prototype.toCssMatrix = function() {
	const m = this.matrix;
	return `matrix(${m[0]}, ${m[3]}, ${m[1]}, ${m[4]}, ${m[2]}, ${m[5]})`;
};

Matrix.prototype.getCurrentScale = function() {
	return this.matrix[0];
};
