const express = require('express');
const router = express.Router();
const users = require('../scripts/users');

router.get('/register', (req, res) => {
    res.status(403);
    res.send('Forbidden!');

    return; //Don't execute after here for now

    res.render('register', {
        title: 'Register'
    });
});

// Register Process
router.post('/register', (req, res) => {
    res.status(403);
    res.send('Forbidden!');

    return; //Don't execute after here for now

    // TODO: Validate user input
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    if (password !== password2) throw new Error('Error');
    
    // 1. Validate that email ends with @enucs.org.uk
    // 2. Validate that email is not already in use
    // 3. Validate passwords match

    users.register(name, email, password)
        .then(() => {
            console.log(name + ' has been registered successfully');
            res.redirect('/users/login');
        })
        .catch((err) => {
            console.error(err);
            res.render('register', {
                errors: err
            });
        });
});

router.get('/login', (req, res) => {
    res.status(403);
    res.send('Forbidden!');

    return; //Don't execute after here for now

    res.render('login', {
        title: 'Log in'
    });
});

// Login process
router.post('/login', (req, res, next) => {
    res.status(403);
    res.send('Forbidden!');

    return; //Don't execute after here for now

    const email = req.body.email;
    const password = req.body.password;

    users.login(email, password)
        .then(() => {
            console.log(email + ' has been logged in successfully');
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
            res.render('login', {
                errors: err
            });
        });
});

module.exports = router;
