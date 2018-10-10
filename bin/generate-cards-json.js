const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function getPathsInDirectory(dirname, callback) {
	return new Promise((resolve, reject) => {
		fs.readdir(path.join(__dirname, dirname), (err, files) => {
			if (err) {
				reject(err);
			}
			// One of the joys of OSX development
			_.pull(files, '.DS_Store');

			const paths = _.map(files, (file) => {
				const staticPath = _.replace(dirname, 'public/', '/');
				return staticPath + '/' + file;
			});
			resolve(paths);
		});
	});
}

function getCardName(url) {
	return _.chain(url)
		.split('/')
		.last()
		.replace('.jpg', '')
		.startCase()
		.value();
}

let files2009;
let files2012;
let filesPhenomena;

getPathsInDirectory('../static/img/planes/2009')
	.then((files) => {
		files2009 = files;
		return getPathsInDirectory('../static/img/planes/2012');
	})
	.then((files) => {
		files2012 = files;
		return getPathsInDirectory('../static/img/phenomena');
	})
	.then((files) => {
		filesPhenomena = files;

		const cards = {};

		_.forEach(files2009, (filename) => {
			cards[getCardName(filename)] = {
				url: filename,
				name: getCardName(filename),
				year: '2009',
				type: 'plane'
			};
		});

		_.forEach(files2012, (filename) => {
			cards[getCardName(filename)] = {
				url: filename,
				name: getCardName(filename),
				year: '2012',
				type: 'plane'
			};
		});

		_.forEach(filesPhenomena, (filename) => {
			cards[getCardName(filename)] = {
				url: filename,
				name: getCardName(filename),
				year: '2012',
				type: 'phenomenon'
			};
		});

		fs.writeFileSync(
			path.join(__dirname, '../src/cards.json'),
			JSON.stringify(cards, null, 2) // 2 to pretty-print
		);
	});
