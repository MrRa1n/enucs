const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in models
let User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register'
    });
});

function register(name, email, password) {
    return new Promise((resolve, reject) => {
        let user = new User({
            name: name,
            email: email,
            password: password
        });

        bcrypt.hash(newUser.password, 10, function(err, hash) {
            if (err) {
                reject(err);
            }
            user.password = hash;
            user.save((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
       
    });
}

// Register Process
router.post('/register', (req, res) => {
    // TODO: Validate user input
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    register(name, email, password)
        .then(res.redirect('/users/login'))
        .catch((err) => {
            res.render('register', {
                errors: err
            });
        });
    
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Log in'
    });
});

// Login process
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

module.exports = router;