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

    $('#search-form').on('submit', function(event) {
      event.preventDefault();
    });
});

function login()
{
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var errorMessage = "";

  // checks if the user has input all fields possible
  if (username == "" || password == "")
  {
    alert("All fields must be completed");
    return false;
  }
  // check if the email already exists in the database
  let checkEmailQuery = "SELECT * FROM users WHERE email = ?";
  let checkEmailData = [email];
  db.pool.query(checkEmailQuery, checkEmailData, function (error, results)
  {
    if (error)
    {
      console.error("Error executing query:", error.stack);
      res.write(JSON.stringify(error));
      return;
    }

    if (results.length > 0)
    {
      // we found a match and email exists NOW NEED TO LOG USER IN
      console.error("Email already exists");
      connection.release();
      return;
    }
  }
)};


function register()
{
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

  // link to Dan's database file
  var db = require('../database/db-connector.js');

  // error handling for database connection check
  db.pool.getConnection(function (err, connection)
  {
    if (err)
    {
      console.error("Error connecting to database:", err.stack);
      return;
    }
    console.log("Connected to database as id", connection.threadId);

    // check if the email already exists in the database
    let checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    let checkEmailData = [email];
    db.pool.query(checkEmailQuery, checkEmailData, function (error, results)
    {
      if (error)
      {
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

      // Execute the query using the db.pool.query method
      db.pool.query(insertQuery, insertData, function (error, rows, fields)
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


//PROFILE PAGE NEEDS THIS LOGIC: <a href="resetPassword.html?username=user123">Reset Password</a>
//LINK TO THIS PAGE AND FUNCTION
//this function will reset the password from the user designated form
function newpassword()
{
  //stores the value of the new password
  let passwordreset = document.getElementByID("newpassword")
  if (!newpassword)
  {
   alert("password field is empty");
   return;
  }
  let email = document.getElementByID(urlParams.get("username"));
  //check against the DB for the email to reset
  let updatePasswordQuery = "UPDATE Users SET password = ? WHERE email = ?";
  let updatePasswordData = [newPassword, email];                                //NEED TO FIGURE OUT HOW TO GET THE EMAIL HERE
  db.pool.query(updatePasswordQuery, updatePasswordData, function (error, result)
  {
    if (error)
    {
      res.write(JSON.stringify(error));
      return;
    }
    else
    {
      alert("Password reset successful!");
    }
  }
)};

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
    db.pool.query(checkQuery, checkData, function(error, rows, fields) {
        if(error)
        {
          res.write(JSON.stringify(error));
          return;
        }
        else if(rows.length === 0)
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
              if (error)
              {
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
    console.log("in generate password now")
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    for (let i = 0; i < length; i++)
    {
      password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return password;
    }

function sendPasswordResetEmail(email, password)
{
  // function to send reset password email from our email
  //crowdsourcedtravelplanner@gmail.com
  //danmelissamatthew
  console.log("in send password reset now")
  const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport(
  {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:
    {
      user: "crowdsourcedtravelplanner@gmail.com",
      pass: "danmelissamatthew"
    }
  });

  let mailOptions =
  {
    from: "crowdsourcedtravelplanner@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Your new password is: ${password}`
  };

  transporter.sendMail(mailOptions, function(error, info)
  {
    if (error)
    {
      console.log(error);
    } else
    {
      console.log("Message sent: %s", info.messageId);
    }
  });
}
