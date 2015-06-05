var express = require('express');
var router = express.Router();
var request = require('request');


/* Search Proxy. */
// router.get('/search', function(req, res, next) {
//     var url=appConfig.vips.catalog+'/catalog/search/' + req.query.q;
//     request(url, function(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             res.send(body);
//         } else {
//             res.status(500).send("oops something went wrongish....");
//         }

//     });
// });

/* Browse Proxy. */
router.get('/browse', function(req, res, next) {
    var url='http://fquick-catalog.nm.flipkart.com/catalog/search/category/' + req.query.cid+"?page_size=10&page_number="+req.query.pno;
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
            res.status(500).send("oops something went wrongish....");
        }
    });
});

/* Availibility Proxy. */
// router.get('/servicibility', function(req, res, next) {
//     var url=appConfig.vips.oms+'/availability/find_availability?latitude=' + req.query.lat+"&longitude="+ req.query.lng;
//     request(url, function(error, response, body) {
//         if (!error && response.statusCode == 200) {
//             res.send(body);
//         } else {
//             res.status(500).send("oops something went wrongish....");
//         }
//     });
// });


// /* address entry Proxy. */
// router.post('/address/new', function(req, res, next) {
//     console.log(req.body);
//     var options = {
//         url: appConfig.vips.oms+'/address/',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(req.body)
//     };
//     request.post(options, function(error, response, body) {
//         if (!error && response.statusCode >= 200 && response.statusCode < 300) {
//             res.send(body);
//         } else {
//             res.status(500).send("oops something went wrongish....");
//         }
//     });
// });


//  order creation Proxy. 
// router.post('/order/create', function(req, res, next) {
//     var bodyStr="";
//     try{
//         bodyStr=JSON.stringify(req.body);
//     }
//     catch(e){
//         res.status(500).send("oops something went wrongish....");
//         try{
//             resCode="";
//             if(response){
//                 resCode=response.statusCode||"N/A";
//             }
//             logger.debug("URL: "+url +",ERROR: Cannot parse req.body");
//         }
//         catch(e)
//         {
//             console.log(e);
//         }
//     }

//     var options = {
//         url: appConfig.vips.oms+'/order/',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: bodyStr
//     };
//     request.post(options, function(error, response, body) {
//         if (!error && response.statusCode >= 200 && response.statusCode < 300) {
//             res.send(body);
//         } else {
//             res.status(500).send("oops something went wrongish....");
//         }
//     });
// });

module.exports = router;
