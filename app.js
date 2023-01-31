/*************************************
SETUP
**************************************/
// Setting up express
const PORT = 3999

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// Setting up handlebars
const { engine } = require('express-handlebars')
app.engine(
  '.hbs',
  engine({
    defaultLayout: 'index.hbs',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
)
app.set('view engine', '.hbs')

/*************************************
LISTENER
**************************************/
app.listen(process.env.PORT || PORT, function () {
  console.log(
    'Express started on http://localhost:' +
      PORT +
      '; press Ctrl-C to terminate.'
  )
})

/*************************************
HOME ROUTE
**************************************/
// Page to render for home
app.get('/', function (req, res) {
  res.render('home.hbs', {
    layout: 'index.hbs',
    pageTitle: 'Travel Planner',
    isHomeRender: true,
  })
})

// Page to render for static search results
app.get('/searchResults', function (req, res) {
  res.render('searchResults.hbs', {
    layout: 'index.hbs',
    pageTitle: 'Travel Planner',
    isHomeRender: false,
    searchType: 'location',
    searchResults: [
      {
        experienceName: 'Topgolf',
        experienceLocation: 'Las Vegas',
        experienceKeywords: ['golf', 'minigolf', 'family', 'games'],
        experienceRating: 3.5,
        experiencePhoto: '/images/golfcourse.jpg',
      },
    ],
  })
})
