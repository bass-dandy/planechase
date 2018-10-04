const express = require('express');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const app = express();
app.use('/dist', express.static(path.join(__dirname, '../../dist/')));
app.use('/static', express.static(path.join(__dirname, '../../static/')));

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
			})
			resolve(paths);
		});
	});
}

app.get('/api/card-urls', function(req, res) {
	let files2009;

	getPathsInDirectory('../../static/img/planes/2009')
		.then((files) => {
			files2009 = files;
			return getPathsInDirectory('../../static/img/planes/2012')
		})
		.then((files2012) => {
			res.json(_.concat(files2009, files2012));
		});
});

// any route that doesn't start with 'api/' should serve the index since we're SPA
app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../static/index.html'));
});

app.listen(1337);
