//
// FundooHR Backend
//

'use strict';

process.title = 'fundoohr';

var express = require('express'),
    cors = require('cors'),
    argv = require('minimist')(process.argv.slice(2)),
    swagger = require("swagger-node-express"),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    jwt    = require('jsonwebtoken');

var app = express();

/////////////////////////////////////////////////////////
var swaggerApiPath = express();

app.use("/pinupapi", swaggerApiPath);
swagger.setAppHandler(swaggerApiPath);
swagger.setApiInfo({
    title: "example Express & Swagger API",
    description: "API to do something, manage something...",
    termsOfServiceUrl: "",
    contact: "yourname@something.com",
    license: "",
    licenseUrl: ""
});
app.use(express.static('dist'));
/////////////////////////////////////////////////////////

app.set('port', process.env.NODE_PORT || 3000);
app.set('host', process.env.NODE_IP || 'localhost');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use("/",express.static("./public")); //Angular
app.use(morgan("dev"));

/////////////////////////////////////////////////
swaggerApiPath.get('/pinupapi', function (req, res) {
  res.sendfile(__dirname + '/dist/index.html');
});

swagger.configureSwaggerPaths('', 'api-docs', '');

var domain = 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".');

// var applicationUrl = 'http://' + domain + ':' + app.get('port');
var applicationUrl = 'http://' + domain;
swagger.configure(applicationUrl, '1.0.0');
/////////////////////////////////////////////////

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
