const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('join', {
        title: 'Join us'
    });
});

module.exports = router;