// create web app with node
const express = require('express');

// helps secure Express apps by setting various HTTP headers
const helmet = require("helmet");

// allows both front and back to communicate
const cors = require('cors');

// makes it easy to interact with database
const mongoose = require('mongoose');

// protects database informations 
require("dotenv").config();

// to work with files path
const path = require('path');

// prevent MongoDB Operator Injection
const sanitize = require("express-mongo-sanitize");

// request limiter
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 500 requests per windowMs
});



// routes to user and sauce 
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


// CONNECT TO DATABASE
mongoose.connect(process.env.secret_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



// call express framework
const app = express();


app.use(cors());
app.use(express.json());
app.use(sanitize());
app.use(limiter);


// to allow cross origins with helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


// configure API routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// export this module to use it somewhere else
module.exports = app;