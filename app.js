
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , restler = require('./node_modules/restler');
  
var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/proxy', function(req, res) {
    restler.get('http://m.cartoon.media.daum.net/data/mobile/webtoon?sort=update&page_size=20&week=all&page_no=1&1336094921908', {
        }).on('complete', function (data) {
                console.log(data)
               res.json(data)
            });
});

http.createServer(app).listen(3000);

console.log("Express server listening on port 3000");
