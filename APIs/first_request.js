var request = require('request');
request('http://www.google.com', function(error,res,body){
    if(!error && res.statusCode ==200) {
           console.log(body)
    }
    })
