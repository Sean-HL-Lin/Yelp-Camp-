var express = require("express");
var app = express()

app.get('/', function(req,res){
    res.send('Hi, there!')
})

app.get('/bye',function(req,res){
    res.send('good bye')
});

app.get('/dog',function(req,res){
    res.send('woof')
});


app.get('/r/:subredditName/comments/:id/:title',function(req,res){
    res.send('welcome to  subreddit')
});




app.get('*',function(req,res){
    res.send('undefined path')
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('the server has started');
});
