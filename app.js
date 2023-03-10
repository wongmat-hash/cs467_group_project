var express = require('express');
var exphbs = require('express-handlebars');
var fileupload = require('express-fileupload');
var session = require('express-session');
var nodeGeocoder = require('node-geocoder');

var app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

let options = {
    provider: 'openstreetmap'
};

port = 5260;

var db = require('./database/db-connector');

const {
    request
} = require('express');
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// default option
app.use(fileupload());

//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', exphbs.engine({
    extname: ".hbs",
    helpers: require(__dirname + '/public/js/helpers.js'),
}));
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');

app.use(express.static('public'))

db.pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('Connected!');
});

// Will display the login page upon the app starting
app.get('/', function (req, res) {
    res.render('index', {
        title: 'express',
        session: req.session
    });
});

// Serves as a screen that will load after successfully logging in
app.get('/landingPage', function (req, res) {
    res.render('landingPage');
});

// Will render the forgot password page
app.get('/forgotpw', function (req, res) {
    res.render('forgotpw');
});

// Will render the addExperience page
app.get('/addExperience', function (req, res) {
    res.render('addExperience');
});

// Will render the resetPassword page
app.get('/resetPassword', function (req, res) {
    res.render('resetPassword');
});

// Will display all experiences saved to the database and display the rounded average of the rating for each
app.get('/searchExperience', (req, res) => {
    let tableQuery;

    tableQuery = 'SELECT ROUND(AVG(Rating.ratingValue), 2) as ratingValue, Experiences.* FROM Experiences LEFT JOIN Rating ON Rating.experienceID=Experiences.experienceID WHERE Rating.ratingValue >= 0 or Rating.ratingValue IS NULL GROUP BY Experiences.experienceID';
    db.pool.query(tableQuery, function (error, rows, fiedls) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        } else {
            //res.render('main', {layout : 'index'});
            res.render('searchExperience', {
                Experiences: rows
            });
        }
    })
});

app.get('/searchExperience/search', (req, res) => {
    let tableQuery
    const userInput = req.query.searchExp;
    tableQuery = "SELECT ROUND(AVG(Rating.ratingValue), 2) as ratingValue, Experiences.* FROM Experiences LEFT JOIN Rating ON Rating.experienceID=Experiences.experienceID WHERE (Rating.ratingValue >= 0 or Rating.ratingValue IS NULL) AND (Experiences.note LIKE ? OR Experiences.location LIKE ?) GROUP BY Experiences.experienceID";

    db.pool.query(tableQuery, [userInput, userInput], function(error, rows, fiedls){
        if(error) {
            res.write(JSON.stringify(error));
            res.end();
        } else {
            res.render('searchExperience', {Experiences: rows})
        }
    })
});

//logout route
app.post('/logout', function(req, res) {
  console.log('in logout function')
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    }
    res.sendStatus(200);
  });
});


// Allow a user to add a rating to an already existing experience
app.post('/searchExperience', function (req, res) {
    let insertQuery = "INSERT INTO Rating (ratingValue, experienceID) VALUES (?,?)";
    let updateData = [req.body.addRatingValue, req.body.experienceID]
    db.pool.query(insertQuery, updateData, function (error, rows, fiedls) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        } else {
            res.redirect('/searchExperience')
        }
    })
});

// Allow for a user to add a new experience
app.post('/addExperience/add', async (req, res) => {
    let sampleImage;
    let uploadPath;

    // use nodeGeocoder to get the lat and long of input city, state and/or country
    let geoCoder = nodeGeocoder(options);
    let latLong = await geoCoder.geocode(req.body.addloc);
    let latitude = latLong[0].latitude;
    let longitude = latLong[0].longitude;
    // variable used to upload to the database
    geoLocate = latitude + ', '+ longitude;
    //console.log(latitude + ', '+ longitude);

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    sampleImage = req.files.sampleImage;
    uploadPath = __dirname + '/public/upload/' + sampleImage.name;
    console.log(sampleImage);

    // use mv() to place file on server
    sampleImage.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

    let insertQuery = "INSERT INTO Experiences (experienceTitle, description, location, image, note) VALUES (?,?,?,?,?)"
    let insertData = [req.body.addexpTitle, req.body.adddesc, geoLocate, sampleImage.name, req.body.addnote]
    db.pool.query(insertQuery, insertData, function(error, rows, fiedls) {
        if(error) {
            res.write(JSON.stringify(error));
            res.end();
        } else {
            res.render('addExperience')
        }
      });
  });
});


// Allow a user to log in with correct username and password
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.pool.query('SELECT userName, password FROM UserAccounts WHERE userName = ? AND password = ?', [username, password], function (error, results) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
        } else {
            if (username && password) {
                if (results.length > 0) {
                    for (var count = 0; count < results.length; count++) {
                        if (results[count].password == password) {
                            session["userName"] = username
                            res.redirect("/landingPage");
                        } else {
                            res.send('Incorrect Username or Password');
                        }
                    }
                } else {
                    res.send('Incorrect Username or Password');
                }
                res.end();
            } else {
                res.send('Please Enter Email Address and Password Details');
                res.end();
            }
        }
    });
});

// Getter to display the registration page
app.get('/Registration', function (req, res) {
    res.render('Registration');
});

// Allow an individual to create a new user
app.post('/Registration', (req, res) => {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const passwordconfirm = req.body.passwordconfirm;

    //error handling to see if fields are all completed
    if (username == "" || firstname == "" || lastname == "" || email == "" || phone == "" || password == "" || passwordconfirm == "") {
        alert("All fields must be completed");
        return false;
    }

    // Validate the PASSWORD matches CONFIRM
    else if (password !== passwordconfirm) {
        alert("Passwords do not match");
        return false;
    }

    // check if the email already exists in the database
    let checkEmailQuery = "SELECT * FROM UserAccounts WHERE email = ?";
    let checkEmailData = [email];
    db.pool.query(checkEmailQuery, checkEmailData, function (error, results) {
        if (error) {
            console.error("Error executing query:", error.stack);
            res.write(JSON.stringify(error));
            return;
        }

        if (results.length > 0) {
            // we found a match and email exists
            console.error("Email already exists");
            connection.release();
            return;
        }

        // Create the INSERT query
        let insertQuery = "INSERT INTO UserAccounts (userName, password, firstName, lastName, email, phoneNumber) VALUES (?,?,?,?,?,?)";
        let insertData = [req.body.username, req.body.password, req.body.firstname, req.body.lastname, req.body.email, req.body.phone];
        // Execute the query using the db.pool.query method
        db.pool.query(insertQuery, insertData, function (error, rows, fields) {
            if (error) {
                console.error("Error executing query:", error.stack);
                res.write(JSON.stringify(error));
                return;
            }
            console.log("Query executed successfully!");
            console.log("User registered successfully!");
            res.redirect("/");
        });
    });
});

app.get('/Trips', function (req, res) {
    let getTripQuery = `
    SELECT * FROM Trips
    WHERE Trips.userName = "${session.userName}";`

    db.pool.query(getTripQuery, function (error, rows) {
        let tripsResults = rows
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.render('Trips.hbs', {
                pageTitle: 'Trips',
                userName: session.userName,
                data: tripsResults
            })
        }
    })
})

app.post('/Trips', function (req, res) {
    let data = req.body
    const addUserName = String(data['userName']).trim()
    const addTripName = String(data['tripName']).trim()

    let insertTripQuery = 'INSERT INTO Trips (tripTitle, userName) VALUES (?,?);'
    let insertTripData = [addTripName, addUserName]

    db.pool.query(insertTripQuery, insertTripData, function (error) {
      if (error) {
        console.log(error)
        res.sendStatus(400)
      } else {
        res.redirect('/Trips')
      }
    })
})

app.delete('/Trips', function (req, res) {
    let data = req.body
    let tripID = parseInt(data["tripID"])
    let deleteQuery = `DELETE FROM Trips WHERE Trips.tripID = ${tripID};`
    db.pool.query(deleteQuery, function (error) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.sendStatus(204)
        }
    })
})

app.get('/Trips/:id/edit/:trip', function (req, res) {
  // get the trip info first
  let getSingleTripExpsQuery = `
        SELECT * FROM TripExperiences
        WHERE TripExperiences.tripID = "${req.params.id}";`
  db.pool.query(getSingleTripExpsQuery, function (error, rows) {
    if (error) {
      console.log(error)
      res.sendStatus(400)
    } else {
      let tripInformation = rows
      let getAllExperiences = `SELECT 
      Experiences.experienceID,
      Experiences.experienceTitle
        FROM Experiences
        LEFT JOIN TripExperiences ON TripExperiences.experienceID = Experiences.experienceID
        WHERE TripExperiences.experienceID IS NULL;`
      db.pool.query(getAllExperiences, function (error, rows) {
        // now get all experiences
        let experiences = rows
        if (error) {
          console.log(error)
          res.sendStatus(400)
        } else {
          res.render('TripExperiences.hbs', {
            pageTitle: `Updating ${req.params.trip}`,
            tripData: tripInformation,
            expData: experiences,
            tripName: req.params.trip,
            tripID: req.params.id
          })
        }
      })
    }
  })
})

app.put('/Trips/:id/edit/:trip', function (req, res) {
    let data = req.body
    console.log(data)

    const tripID = parseInt(data["tripID"])
    const tripName = String(data["tripName"]).trim()
    let updateTripData = [tripName]
    let updateTripQuery = `UPDATE Trips SET tripTitle = (?) WHERE Trips.tripID = ${tripID};`
    db.pool.query(updateTripQuery, [updateTripData], function (error) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.sendStatus(200)
        }
    })
})

app.post('/Trips/:id/edit/:trip', function (req, res) {
    let data = req.body
    //console.log(data)

    const tripID = parseInt(data["tripID"])
    const tripName = String(data["tripName"]).trim()
    const expID = parseInt(data["expID"])
    const expName = String(data["expName"]).trim()
    
    let insertTripExpData = [tripID, expID, expName, tripName]
    let insertTripExpQuery = `INSERT INTO TripExperiences (tripID, experienceID, experienceTitle, tripTitle) VALUES (?,?,?,?);`
    //console.log(insertTripExpQuery)
    db.pool.query(insertTripExpQuery, insertTripExpData, function (error) {
      if (error) {
        console.log(error)
        res.sendStatus(400)
      } else {
        res.redirect('/Trips/:id/edit/:trip')
      }
    })
})

app.delete('/Trips/:id/edit/:trip', function (req, res) {
    let data = req.body
    const tripID = parseInt(data["tripID"])
    let expID = parseInt(data["expID"])
    let deleteQuery = `DELETE FROM TripExperiences WHERE TripExperiences.experienceID = ${expID} AND TripExperiences.tripID = ${tripID};`
    //console.log(deleteQuery)
    db.pool.query(deleteQuery, function (error) {
        if (error) {
            console.log(error)
            res.sendStatus(400)
        } else {
            res.sendStatus(204)
        }
    })
})

app.listen(port, () => console.log(`App listening to port ${port}`));

module.exports = app;
