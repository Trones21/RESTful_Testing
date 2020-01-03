//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;

// define the Express app
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

//Connection to DB

const uri = "mongodb+srv://Trones:LEster21@!@cluster0-e5s6h.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


// const registrars = [];

/******   APIs    ******/

//Example
app.get('/', (req, res) => {
    const regs = "Got response from your api";
    res.send(regs);
});

//Get a specific Registrar
app.get('/registrars/:id', (req, res) => {
    const registrar = registrars.filter(r => (r.id === parseInt(req.params.id)));
    if (registrar.length > 1) return res.status(500).send();
    if (registrar.length === 0) return res.status(404).send();

    res.send(registrar);
});

//Save Suite
app.post('/UNK', (req, res) => {
    console.log("POST req received");
    console.log(req.body);

    // client.connect(err => {
    //     const collection = client.db("test").collection("devices");
    //     // perform actions on the collection object
    //     client.close();

    // });
    res.status(200).send("Not Implemented");
});

// start the server
app.listen(8099, () => {
    console.log('listening on port 8099');
});