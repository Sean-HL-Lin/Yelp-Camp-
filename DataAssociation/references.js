var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var postSchema = new mongoose.Schema({
           title: String,
           content: String
        });
        
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
            email: String,
            name: String,
            posts: [{type:mongoose.Schema.Types.ObjectId,ref:"Post"}]
        });
        
     
var User = mongoose.model("User", userSchema);



User.create({
    email: "bob@gmail.com",
    name: "Bob Belcher"
});

Post.create({
  title: "a new post ",
  content: "AKLSJDLAKSJD"
}, function(err, post) {
    if(err) {
        console.log('err')
        console.log(err)
    } else {
        console.log(post)
        User.findOne({email: "bob@gmail.com"}, function(err,foundUser){
            foundUser.posts.push(post)
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        })
    }
})






////**** method two
// Post.create({
//   title: "How to cook the best burger pt. 4",
//   content: "AKLSJDLAKSJD"
// }, function(err, post){
//     User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
//         if(err){
//             console.log(err);
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

// Find user
// find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });


// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });