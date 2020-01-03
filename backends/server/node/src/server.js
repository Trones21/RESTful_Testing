
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    helmet = require('helmet'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    
    Suite = require('./api/models/SuiteModel'),
    
    app = express();


mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Trones:lZc76xMNWPAAdFfJ@cluster0-e5s6h.azure.mongodb.net/endpointTesterDB');

// enhance app security with Helmet
app.use(helmet());
// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
// enable all CORS requests
app.use(cors());
// log HTTP requests
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static('../../../frontend/src'));

var routes = require('./api/routes/SuiteRoutes');
routes(app); //Register routes with app object

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

// start the server
app.listen(9998, "localhost", () => {
    console.log('listening on port 9998');
});