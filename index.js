const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
 
//set up express app (createApplication())
const app = express();

//connect to mongodb
//ninjago is the name of our database
mongoose.connect('mongodb://localhost/ninjago');
//mongoose promise is deprecated, so we set it to node promise
mongoose.Promise = global.Promise;

//.................................................
//These (use) function is executed every time the app receives a request

app.use(express.static('public'))

//This should come before using routes
app.use(bodyParser.urlencoded({ extended: true })); //Third party middleware

//load the 'routes' router on '/api', on the app
app.use('/api', routes);

// Error-handling middleware always takes four arguments.
app.use(function(err, req, res, next){
    res.status(422).send({error: err._message});
});
//.................................................


/**
 * listen for requests
 * listen to port 4000
 * 
 * The call-back function kick off as it listen to
 * the port 4000
 * 
 * process.env.port is if we have another port say like heroku
 */
app.listen(process.env.port || 2000, function () { 
    console.log('now listening for requests');
});


