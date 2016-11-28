var express = require('express');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var app = express();
app.use(express.static('public'));

// any route that doesn't start with 'api/' should serve the index since we're SPA
app.get(/^(?!\/api\/)(.*)/, function(req, res) {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

function getPathsInDirectory(dirname, callback) {
	fs.readdir(path.join(__dirname + '/' + dirname), function(err, files) {
		// One of the joys of OSX development
		_.pull(files, '.DS_Store');

		var paths = _.map(files, function(file) {
			return dirname + '/' + file;
		})
		callback(err, paths);
	});
}

app.get('/api/card-urls', function(req, res) {
	getPathsInDirectory('public/img/planes/2009', function(err, files2009) {
		getPathsInDirectory('public/img/planes/2012', function(err, files2012) {
			res.json(_.concat(files2009, files2012));
		});
	});
});

app.listen(1337);
