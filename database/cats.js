var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/cat_app');



var catSchema = new mongoose.Sechema({
    name:String,
    age:Number,
    temperament:String
})

var Cat = mongoose.model('Cat', catSchema)

//adding new cat into database 
new Cat


// retrieve data 