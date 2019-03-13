var express    = require("express"),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    methodOverride = require("method-override"),
    sanitizer  = require("express-sanitizer"),
    app        = express();
    
    

mongoose.connect('mongodb://localhost:27017/blogapp', {useNewUrlParser: true}) 
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(sanitizer())
app.use(methodOverride('_method'))



// mongoose model
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

var blog = mongoose.model('blog', blogSchema);

//restfull route
app.get('/', function(req,res){
    res.redirect('/blogs')
})

app.get('/blogs', function(req,res){
    blog.find({}, function(err,response){
        if(err){
            console.log('there is a err')
            console.log(err)
        } else {
            res.render('index', {blogs:response})
        }
    })
})


//new route
app.get('/blogs/new', function(req,res){
    res.render('new');
})


//SHOW page 
app.get('/blogs/:id', function(req,res){
     blog.findById(req.params.id, function(err, response){
         if(err){
            console.log('there is an err')
            console.log(err)
         } else {
            res.render('show', {blog:response})
         }
     })
})


// create route
app.post('/blogs', function(req, res){
    //add database
    req.body.blog.body = req.sanitize(req.body.blog.body)
    blog.create(req.body.blog, function(err, result){
        if(err){
            console.log('there is a err')
            console.log(err)
        } else {
            // redirect
            res.redirect('/blogs')
        }
    })
})


//Edit page 
app.get('/blogs/:id/edit', function(req, res){
    blog.findById(req.params.id, function(err, blogId){
        if(err){
            console.log('there is an err')
            console.log(err)
        } else { 
            res.render('edit',{blog:blogId})
        }
    })

})


// Update
app.put('/blogs/:id', function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatablog){
        if(err){
            console.log('there is an err')
            console.log(err)
        } else {
            console.log('no err')
            res.redirect('/blogs/' +  req.params.id)
        }
    })
})


//Delete
app.delete('/blogs/:id', function(req, res){
    blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log('there is an err')
            console.log(err)
        } else {
            res.redirect('/blogs')
        }
    })
})


//title
//image
//body 
//created 

app.listen(process.env.PORT, process.env.IP, function(req,res){
    console.log('the server has started');
});