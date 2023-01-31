var express = require('express');
var exphbs = require('express-handlebars');
var fileupload = require('express-fileupload');

var app = express();
port = 5253;

var db = require('./database/db-connector')
app.use(express.json())

// default option
app.use(fileupload());

//Sets handlebars configurations (we will go through them later on)
app.engine('hbs', exphbs.engine({extname: ".hbs"}));
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');

app.use(express.static('public'))

db.pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected!');
});

app.get('', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', {layout : 'index'});
});

app.post('', (req, res) => {
    let sampleImage;
    let uploadPath;

    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    sampleImage = req.files.sampleImage;
    uploadPath = __dirname + '/upload/' + sampleImage.name;
    console.log(sampleImage);

    // use mv() to place file on server
    sampleImage.mv(uploadPath, function(err) {
        if(err) return res.status(500).send(err);

    //res.send('File Uploaded!');

    let insertQuery = "INSERT INTO Experiences (experienceTitle, description, location, image, note) VALUES (?,?,?,?,?)"
    let insertData = [req.body.expTitle, req.body.desc, req.body.loc, sampleImage.name, req.body.note]
    db.pool.query(insertQuery, insertData, function(error, rows, fiedls) {
        if(error) {
            res.write(JSON.stringify(error));
            res.end();
        } else {
            res.redirect('/')
        }
    }
    
)});


});

app.listen(port, () => console.log(`App listening to port ${port}`));