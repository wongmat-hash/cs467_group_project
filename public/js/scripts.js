// this makes all the nav buttons green or not green
$(document).ready(function() {
    //trips
    $('.index-button').click(function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        // Load trips template in the right column
    });
    //add
    $('.navigationAdd-button').click(function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        // Load add experiences template in the right column
    });
    //search
    $('.navigationSearch-button').click(function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        // Load search experiences template in the right column
    });
    //save
    $('.navigationSaved-button').click(function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        // Load saved experiences template in the right column
    });

    $('.navigationReset-button').click(function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        // Load reset password template in the right column
    });

    $('.navigationLogout-button').click(function() {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        // redirect to logout
    });
});

// this function is used by our index.hbs to log the user in
function login()
{
    // store the user variables from our hbs page in username and password by ID
    let username = document.getElementById("logusername").value;
    let password = document.getElementById("logpassword").value;
    // error message for handling
    let errorMessage = "";

    // checks if the user has input all fields possible
    if (username == "" || password == "")
    {
        alert("All fields must be completed");
        return false;
    }
    // check if the email already exists in the database
    let checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    let checkEmailData = [username];
    db.pool.query(checkEmailQuery, checkEmailData, function(error, results)
    {
        if (error)
        {
            console.error("Error executing query:", error.stack);
            res.write(JSON.stringify(error));
            return;
        }

        if (results.length > 0)
        {
            // we found a match and email exists
            console.error("Email already exists");
            connection.release();
            return;
        }
    })
};



// registration function used by registration.hbs
function register()
{
    //storage variables to grab information from page by ID
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("password-confirm").value;

    //error handling to see if fields are all completed
    if (username == "" || email == "" || password == "" || confirmPassword == "")
    {
        alert("All fields must be completed");
        return false;
    }

    // Validate the PASSWORD matches CONFIRM
    else if (password !== confirmPassword)
    {
        alert("Passwords do not match");
        return false;
    }

    // Create the INSERT query
    let insertQuery = "INSERT INTO users (username, email, phone, password) VALUES (?,?,?,?)";

    // Create an array to store the values for the query including phone which has not been used
    let insertData = [username, email, phone, password];

    // link to Dan's database file (team mates OSU db he set up)
    var db = require('../database/db-connector.js');

    // error handling for database connection check
    db.pool.getConnection(function(err, connection)
    {
        if (err)
        {   //error message
            console.error("Error connecting to database:", err.stack);
            return;
        }
        //otherwise show that we connected
        console.log("Connected to database as id", connection.threadId);

        // check if the email already exists in the database
        let checkEmailQuery = "SELECT * FROM users WHERE email = ?";
        let checkEmailData = [email];
        db.pool.query(checkEmailQuery, checkEmailData, function(error, results)
        {
            if (error)
            {   //more error handling
                console.error("Error executing query:", error.stack);
                res.write(JSON.stringify(error));
                return;
            }

            if (results.length > 0)
            {
                // we found a match and email exists
                console.error("Email already exists");
                connection.release();
                return;
            }

            // Execute the query using the db.pool.query method
            db.pool.query(insertQuery, insertData, function(error, rows, fields)
            {
                if (error)
                {
                    console.error("Error executing query:", error.stack);
                    res.write(JSON.stringify(error));
                    return;
                }
                console.log("Query executed successfully!");
                console.log("User registered successfully!");
                res.redirect("/login.html");
                connection.release();
            });
        });
    });
};

//newpassword function used by landingpage.hbs
function newpassword()
{
    //stores the value of the new password
    let passwordreset = document.getElementById("newpassword")
    let email = document.getElementById(urlParams.get("email"));
    if (!passwordreset)
    {
        alert("password field is empty");
        return;
    }

    //check against the DB for the email to reset
    let updatePasswordQuery = "UPDATE Users SET password = ? WHERE email = ?";
    let updatePasswordData = [passwordreset, email]; //NEED TO FIGURE OUT HOW TO GET THE EMAIL HERE
    db.pool.query(updatePasswordQuery, updatePasswordData, function(error, result)
    {
        if (error)
        {
            res.write(JSON.stringify(error));
            return;
        } else
        {
            alert("Password reset successful!");
        }
    })
};

// used by the reset password function (forgot password)
function reset()
{
    //grabs from the page by email value
    let email = document.getElementById("email").value;

    //error handling for empty email field
    if (!email)
    {
        alert("email field is empty")
        return;
    }

    //checks against DB for email to reset
    let checkQuery = "SELECT * FROM Users WHERE email = ?";
    let checkData = [email];
    db.pool.query(checkQuery, checkData, function(error, rows, fields)
    {
        if (error)
        {
            res.write(JSON.stringify(error));
            return;
        } else if (rows.length === 0)
        {
            alert("Email not found.");
        }
        else
        {
            //found email and we can begin reset
            let newPassword = generatePassword();
            let updatePasswordQuery = "UPDATE Users SET password = ? WHERE email = ?";
            let updatePasswordData = [newPassword, email];
            db.pool.query(updatePasswordQuery, updatePasswordData, function(error, rows, fields)
            {
                if (error) {
                    res.write(JSON.stringify(error));
                    return;
                }
                sendPasswordResetEmail(email, newPassword)
            });
        }
    });
}

// this function will generate a new password and pass it back
function generatePassword(length)
{
    //just randomly generate using a library
    console.log("in generate password now")
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    for (let i = 0; i < length; i++)
    {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return password;
}

// this should work with forgot passsword to send new password email NOT WORKING
function sendPasswordResetEmail(email, password)
{
    // function to send reset password email from our email
    //crowdsourcedtravelplanner@gmail.com
    //danmelissamatthew
    console.log("in send password reset now")
    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "crowdsourcedtravelplanner@gmail.com",
            pass: "danmelissamatthew"
        }
    });

    let mailOptions = {
        from: "crowdsourcedtravelplanner@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Your new password is: ${password}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: %s", info.messageId);
        }
    });
}

function newpassword() {
    console.log("I AM INSIDE NEW PASSWORD")
    // Get the value of the new password field
    let passwordreset = document.getElementById("newpassword").value;

    // Check if the new password field is empty
    if (!passwordreset) {
        alert("Password field is empty");
        return;
    }

    // Get the email from the URL parameters
    let urlParams = new URLSearchParams(window.location.search);
    let email = urlParams.get("email");

    // Update the password in the database
    let updatePasswordQuery = "UPDATE Users SET password = ? WHERE email = ?";
    let updatePasswordData = [passwordreset, email];
    db.pool.query(updatePasswordQuery, updatePasswordData, function(error, result) {
        if (error) {
            res.write(JSON.stringify(error));
            return;
        } else {
            alert("Password reset successful!");
            window.location.href = "/login"; // Redirect to the login page
        }
    });
}

//function to reset our add form on landingPage
function formSet()
{
  console.log("Inside Formset");
  document.getElementById("expereinceTitle").value = "";
  document.getElementById("description").value = "";
  document.getElementById("location").value = "";
  document.getElementById("sampleImage").value = "";
  document.getElementById("note").value = "";
  document.getElementById("sampleImage").innerHTML = "";
};
