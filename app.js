const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

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


app.use(express.static('public'));
//to accecpt form data
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (req, res) => {
  console.log('REDIRECTING TO /BLOGS, GET /');
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  //res.send('<p>about page</p>');
  res.render('about', {title: 'about'});

});
// blog routes
app.use('/blogs', blogRoutes);

// must stay bottom of the page
app.use((req, res) => {
  res.status(404).render('404', {title: '404'});
  console.log('404 ERROR');
});