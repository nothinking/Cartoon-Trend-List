
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


// Cartoon API Forke
var apiUrl = "http://m.cartoon.media.daum.net/data/mobile/webtoon";
app.get('/proxy', function(req, res) {
	var page_size = req.param("page_size") || 1;
	var page_no = req.param("page_no") || 1;	
 	var sort = req.param("sort") || "update";
 	var week = req.param("week") || "all";
	var seed = +new Date();	
	var url = apiUrl+"?page_size="+page_size+"&page_no="+page_no+"&sort="+sort+"&week="+week+"&"+seed;	
	console.log(url);			
    restler.get(url, {}).on('complete', function (data) {
    	if(data.result.status == "200"){
	    	res.json(data);
    	}else{
	    	res.json({result : {status : data.result.status , message : "error"}});
	    }	
	});
});

http.createServer(app).listen(3000);

console.log("Express server listening on port 3000");
