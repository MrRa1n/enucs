const express = require('express');
const router = express.Router();

const path = require('path');

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us'
    });
});

module.exports = router;