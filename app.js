// create web app with node
const express = require('express');

// allow both front and back to communicate
const cors = require('cors');

// make it easy to interact with database
const mongoose = require('mongoose');

// ?
const path = require('path');

// routes to user and sauce 
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


// CONNECT TO DATABASE
mongoose.connect('mongodb+srv://fannycoponat:fannycoponat@cluster0.4drwlse.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// call express framework
const app = express();


app.use(cors());

// ?
app.use(express.json());

// configure API routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

// export this module to use it somewhere else
module.exports = app;