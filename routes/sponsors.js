const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('sponsors', {
        title: 'Sponsors'
    });
});

module.exports = router;