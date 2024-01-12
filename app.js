const express=require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');
const { result, find } = require('lodash');
const Blog=require('./models/blogs');
//express app

const app=express();

//connect to mongo db
const dbID='';
const dbPassword='';
const dbURI = 'mongodb+srv://'+dbID+':' + encodeURIComponent(dbPassword) + '@cluster0.armug7p.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
//.then(console.log('connected to db'))
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));




// //regiser view enh engine
// app.set('view engine','ejs');



// //middelware & static files

// app.use(express.static('public'));
// app.use(express.urlencoded({extended:true}));
// app.use(morgan('dev'));

// //mongoose and mongo sanbox routes
// app.get('/add-blog',(req,res)=>{
//     const blog=new Blog({
//         title:'new blog 2',
//         snippet:'about my new blog',
//         body:'more about my nnnn bloggg'
//     });
//     blog.save()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// })


// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// })


// app.get('/', (req, res) => {
//     res.redirect('/blogs')
// });

// app.get('/about',(req,res)=>{
//     res.render('about', { title: 'About' });
// });
// //redirect
// app.get('/about-us',(req,res)=>{
//     res.redirect('/about');
// })


// app.get('/blogs',(req,res)=>{
//     Blog.find().sort({createdAt:-1})
//     .then((result)=>{
//         res.render('index',{title:'All blogs',blogs:result});
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })
// app.post('/blogs',(req,res)=>{
//     const blog =new Blog(req.body);
//     blog.save()
//     .then((result)=>{
//         res.redirect('/blogs');
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

// app.get('/blogs/:id',(req,res)=>{
//     const id=req.params.id;
//     Blog.findById(id)
//     .then(result=>{
//         res.render('details',{blog:result,title:'Blog Details'});
//     })
//     .catch(err=>{
//         console.log(err);
//     })
// })





// app.get('/blogs/create', (req, res) => {
    
//     res.render('create', { title: 'Create a new Blog'});
// });

// //404
// app.use((req,res)=>{
//     res.status(404).render('404', { title: '404' })
// })
    



// const express = require('express');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const Blog = require('./models/blog');

// express app
// const app = express();

// // connect to mongodb & listen for requests
// const dbURI = "mongodb+srv://netninja:test1234@net-ninja-tuts-del96.mongodb.net/node-tuts";

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(result => app.listen(3000))
//   .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});