const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('https://shop.spreadshirt.co.uk/enucs1/');
});

module.exports = router;