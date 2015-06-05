var express = require('express');
var fs = require('fs');
var router = express.Router();
var app = express();
var request = require('request');

/* Search Proxy. */
router.get('*', function(req, res, next) {
    var url='http://172.20.201.99:31338/images' + req.url;
    console.log(url);
    request.get(url).pipe(res);
});

module.exports = router;
