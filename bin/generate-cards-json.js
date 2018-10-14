const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const glob = require('glob');

function getCardUrl(filepath) {
	return path.relative(path.join(__dirname, '../static'), filepath);
}

function getCardYear(filepath) {
	return _.chain(filepath)
		.split('/')
		.nth(-4)
		.value();
}

function getCardSet(filepath) {
	return _.chain(filepath)
		.split('/')
		.nth(-3)
		.startCase()
		.value();
}

function getCardType(filepath) {
	return _.chain(filepath)
		.split('/')
		.nth(-2)
		.startCase()
		.value();
}

function getCardName(filepath) {
	return _.chain(filepath)
		.split('/')
		.last()
		.replace('.jpg', '')
		.startCase()
		.value();
}

function getCardId(filepath) {
	const cardName = getCardName(filepath);
	return _.kebabCase(cardName);
}

glob(path.join(__dirname, '../static/img/cards/**/*.jpg'), (err, files) => {
	if (err) {
		console.log(err); // eslint-disable-line no-console
	} else {
		const cards = {};

		_.forEach(files, (filepath) => {
			const id = getCardId(filepath);

			cards[id] = {
				id,
				url: getCardUrl(filepath),
				name: getCardName(filepath),
				year: getCardYear(filepath),
				set: getCardSet(filepath),
				type: getCardType(filepath)
			};
		});

		fs.writeFileSync(
			path.join(__dirname, '../src/cards.json'),
			JSON.stringify(cards, null, 2)
		);
	}
});
