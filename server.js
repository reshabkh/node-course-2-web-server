const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(error) => {
    console.log('unable to append server.js');
  });
  next();
});
/*app.use((req,res,next) => {
  res.render('maintenance.hbs');
  //next();
});*/
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})
app.get('/',(req,res) => {
  //res.send('<h1>Hello Express</h1>');
  res.render('home.hbs',{
    pageTitle : 'Home Page',
    welcomeMessage : 'Welocome to my website',

  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle : 'About Page',

  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage : 'unable to handle request'
  });
});
app.get('/projects',(req,res) => {
  res.render('projects.hbs',{
    pageTitle : 'Projects'
  });
});


app.listen(port, () => {
  console.log(`server is ready at port ${port}`);
});
