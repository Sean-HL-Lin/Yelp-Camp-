
var express = require("express")
var app = express()


app.get('/', function(req,res){
    res.send("Hi there, welcome to my assignment!")
})

app.get('/speak/:ani', function(req,res){
    var animal = req.params.ani.toLowerCase()
    var asound ={
        pig:"'Oink'",
        cow:"'Moo'",
        dog:"'Woof Woof!'"
    }
    res.send("The " + animal+ " says " + asound[animal])
})


app.get('/repeat/:wrd/:times', function(req,res){
    var t = Number(req.params.times)
    var word = req.params.wrd
    var astring =''
    for(var i=0; i<t; i++) {
        astring += ' ' + word
    }
    res.send(astring)
})


app.get('*', function(req,res){
    res.send("Sorry, page not found...What are you doing with your life?")
})



app.listen(process.env.PORT, process.env.IP, function(req,res){
    console.log('the server has started');
    console.log('see app below')
    console.log(app)
});






