'use strict';

const express = require('express'),
router = express.Router(); 

router.post('/a/login', function(req, res) {
    console.log(req.body);
    res.send('logging you in');
    // res.render('../dist/index.html');
});

exports.index = router;