var express = require("express")
var app = express();
var request = require("request")

app.set('view engine','ejs');

app.get('/', function(req,res){
    res.render('search')
});

app.get('/result' , function(req,res){
    var target = req.query.search;
    console.log(req)
    var url = "http://omdbapi.com/?s=" + target + '&apikey=thewdb';
    request(url, function(error, response, body){
        if (!error&&response.statusCode == 200){
            var mdata = JSON.parse(body);
            res.render('result',{data:mdata})
         
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(req,res){
    console.log('the server has started');
});
