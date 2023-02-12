const express = require('express');
const hbs = require('hbs');

const app = express();
const path = require('path');

// Set the view engine to hbs
app.set('view engine', 'hbs');

// Serve static files from the 'public' folder
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Set the views directory
app.set('views', __dirname + '/views');

// Register the partials directory
hbs.registerPartials(__dirname + '/views/partials');

// Serve the index page
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Profile Page',
    header: 'My Profile'
  });
});

// serve the profile trips page
app.get('/Trips', function (req, res) {
  res.render('index',{title: 'Trips'});
});

// serve the profile add page
app.get('/', function (req, res) {
  res.render('index',{title: 'Add'});
});

// serve the profile Search page
app.get('/', function (req, res) {
  res.render('index',{title: 'Search'});
});

// serve the profile Saved page
app.get('/', function (req, res) {
  res.render('index',{title: 'Saved'});
});

// serve the profile Reset page
app.get('/', function (req, res) {
  res.render('index',{title: 'Reset'});
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
