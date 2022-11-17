const express = require('express');

const app = express();

// register view engine
app.set('view engine', 'ejs');


// register

//listen for requests
app.listen(3000);


app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host :', req.hostname);
  console.log('path :', req.path);
  console.log('method :', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});
app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi find eggs', snippet: 'alsd;fkjjsaflkasf laksdjfsalkdfj asdflkjasdlkfj alsdkfjsadlk'},
    {title: 'Yoshi find bitches', snippet: 'alsd;fkjjsaflkasf laksdjfsalkdfj asdflkjasdlkfj alsdkfjsadlk'},
    {title: 'Yoshi find some shits', snippet: 'alsd;fkjjsaflkasf laksdjfsalkdfj asdflkjasdlkfj alsdkfjsadlk'},
  ];

  res.render('index', {title: 'home', blogs});

});
app.get('/about', (req, res) => {
  //res.send('<p>about page</p>');
  res.render('about', {title: 'about'});

});

app.get('/blogs/create', (req, res) => {
  res.render('create', {title: 'create a new blog'});
});

// must stay bottom of the page
app.use((req, res) => {
  res.status(404).render('404', {title: '404'});
});