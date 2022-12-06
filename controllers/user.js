const bcrypt = require('bcrypt'); //crypt informations
const jwt = require('jsonwebtoken'); //create random tokens
const User = require('../models/user'); //import user model


// SIGN UP
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //hash password 10 times 
      .then(hash => {
        // create new user
        const user = new User({
          email: req.body.email, //get request body = email
          password: hash //hash password when user create it
        });
        user.save() //save user into database
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


// LOGIN
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //check if user email is into database
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) //compare input and database
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({ //if valid send this object
                        userId: user._id,
                        token: jwt.sign( //create token with user informations
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET', //secret key
                            { expiresIn: '24h' } //last 24h
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };