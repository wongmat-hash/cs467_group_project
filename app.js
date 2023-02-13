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

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
