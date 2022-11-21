const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');


const app = express();

const dbURI = 'mongodb+srv://tommy:live4cob@cluster0.wh9bb.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => {
    app.listen(3000);
    console.log('connected to db');
  })
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');


// register

//listen for requests

app.use(express.static('public'));
//to accecpt form data
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.redirect('/blogs');
});
app.get('/about', (req, res) => {
  //res.send('<p>about page</p>');
  res.render('about', {title: 'about'});

});



app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1})
    .then((result) => {
      res.render('index', {title: 'All Blogs', blogs: result})
    })
    .catch((err) => {console.log(err);});
});

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'create a new blog'});
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
   .then((result) => {
     // rediriger vers blogs pour qu on voit la liste de blogs apres le post
    res.redirect('/blogs');
   })
   .catch((err) => {
     console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' })
    })
    .catch((err) => {console.log(err);});
});



// must stay bottom of the page
app.use((req, res) => {
  res.status(404).render('404', {title: '404'});
});