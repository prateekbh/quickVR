var express = require('express');
var fs = require('fs');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('*', function(req, res, next) {
    var __rootDir = process.cwd();

    fs.exists(__rootDir + "/public" + req.path, function(exist) {
        if (exist) {
            if (app.get('env') === 'production') {
                res.set({
                    'Expires:Mon': '22 Jan 2035 05:42:03 GMT',
                    'Cache-Control': 'public, max-age=' + 365 * 24 * 60 * 60
                });
            }
            res.sendFile(__rootDir + "/public" + req.path);
        } else {
            res.status(404).send("Static file Not Found!!!");
        }
    });
});

module.exports = router;
