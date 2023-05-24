var express = require('express'),
cors = require('cors'),
fs = require('fs'),
async = require('async'),
zlib = require('zlib'),
// imagemin = require('imagemin'),
// imageminJpegtran = require('imagemin-jpegtran'),
// imageminPngquant = require('imagemin-pngquant'),
httpsRedirect = require('express-https-redirect'),
app = express();
app.use('/', httpsRedirect());
app.use(cors());
app.options('*', cors());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('*.html', function (req, res, next) {
	fs.readFile(__dirname + '/build' + req.url, 'utf8', function(err, data) {
		zlib.gzip(data, function(_, file) {
			res.writeHead(200, {'Content-Type': 'text/html', 'Content-Encoding': 'gzip'});
			res.end(file);
		})
	})
});

app.get('*.js', function (req, res, next) {
	fs.readFile(__dirname + '/build' + req.url, 'utf8', function(err, data) {
		zlib.gzip(data, function(_, file) {
			res.writeHead(200, {'Content-Type': 'text/javascript', 'Content-Encoding': 'gzip'});
			res.end(file);
		})
	})
});

app.get('*.css', function (req, res, next) {
	fs.readFile(__dirname + '/build' + req.url, 'utf8', function(err, data) {
		zlib.gzip(data, function(_, file) {
			res.writeHead(200, {'Content-Type': 'text/css', 'Content-Encoding': 'gzip'});
			res.end(file);
		})
	})
});

app.get('*.woff2', function (req, res, next) {
	fs.readFile(__dirname + '/build' + req.url, 'utf8', function(err, data) {
		zlib.gzip(data, function(_, file) {
			res.writeHead(200, {'Content-Type': 'font', 'Content-Encoding': 'gzip'});
			res.end(file);
		})
	})
});

app.use(express.static('build'));

var urls = {
	polling_centre: "assets/resources/polling-centres/",
	president: "assets/results/all-president-election-results/",
    parliament: "assets/results/all-parliamentary-election-results/",
    mayor: "assets/results/all-mayor-election-results/",
    chairperson: "assets/results/all-chairperson-election-results/",
    villageheadman: "assets/results/all-village-headman-election-results/",
    councilor: "assets/results/all-councillor-election-results/",
    president_2018: "assets/results/all-president-polling-centre-results-2018/",
	president_2023: "assets/results/all-president-election-results-2023/",
    parliament_2018: "assets/results/all-parliamentary-polling-centre-results-2018/",
    mayor_2018: "assets/results/all-mayor-chair-polling-centre-results-2018/",
    councilor_2018: "assets/results/all-councillor-polling-centre-results-2018/",
    villageheadman_2018: "assets/results/all-villageheadman-polling-centre-results-2018/",
}

var _whole_results = {};

app.get('/election_results', function(req, res, next) {
	async.forEachOf(urls, function(url, key, callback) {
		fs.readdir(url, function(err, names) {
			async.map(names, function(name, callback) {
				fs.readFile(url + name, 'utf8', function(err, contents) {
					callback(null, contents == "" ? [] : JSON.parse(contents));
				});
			}, function(err, results) {
				if (err) res.send([]);

				var election_results = [];
				results.forEach(function(items) {
					election_results = election_results.concat(items);
				});

				_whole_results[key] = election_results;
				callback(null)
			})
		})
	}, function(err) {
		res.writeHead(200, {'Content-Type': 'application/json', 'Content-Encoding': 'gzip'});
		var buf = new Buffer(JSON.stringify(_whole_results), 'utf-8');
		zlib.gzip(buf, function(_, result) {
			res.end(result);
		})
	})
})

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});