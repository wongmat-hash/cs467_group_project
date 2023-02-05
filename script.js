function login()
{
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var errorMessage = "";

  //error handling to check if the user has a valid account or enters info
  if(!username)
  {
    errorMessage = "Please enter a valid username.";
  }
  else if(!password)
  {
    errorMessage = "Please enter a valid password.";
  }
  else if(username !== "user"||password !== "password")
  {
    errorMessage = "Incorrect username or password.";
  }

  if (errorMessage) {
    document.getElementById("error").innerHTML = errorMessage;
  }
  else
  {
    // logic to log in user
  }
}


function register()
{
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("password-confirm").value;

  //error handling to see if fields are all completed
  if (username ==  "" || email == "" || password == "" || confirmPassword == "")
  {
    //NEED TO WORK ON GETTING THESE FIELDS TO DISPLAY ERROR MESSAGES ON THE HTML
    alert("all fields must be complete");
    return false;
  }
  // Validate the USERNAME input (NEED TO BE ABLE TO CHECK AGAINST DB)
  if (!username)
  {
    errorMessage = "Please enter a valid username.";
  }
  // Validate the EMAIL input (NEED TO BE ABLE TO CHECK AGAINST THE DB)
  else if (!email)
  {
    errorMessage = "Please enter your email.";
  }
  // Validate the PASSWORD input (NEED TO BE ABLE TO CHECK AGAINST THE DB)
  else if (!password)
  {
    errorMessage = "Please enter a password.";
  }
  // Validate the 2nd PASSWORD input (NEED TO CHECK AGAINST DB)
  else if (!confirmPassword)
  {
    errorMessage = "Please confirm your password.";
  }
  // Validate the PASSWORD matches CONFIRM
  else if (password !== confirmPassword)
  {
    alert = "Passwords do not match.";
  }

  // Create the INSERT query
  let insertQuery = "INSERT INTO users (username, email, phone, password) VALUES (?,?,?)";

  // Create an array to store the values for the query including phone which has not been used
  let insertData = [username, email, phone, password];

  // Execute the query using the db.pool.query method
  db.pool.query(insertQuery, insertData, function(error, rows, fields)
  {
    if (error)
    {
      res.write(JSON.stringify(error));
      return;
    }
    else
    {
      // Redirect to the homepage or display a success message
      console.log("User registered successfully!");
      res.redirect('/login.html') //INSERT URL FOR HOME PAGE WHEN LINKING
    }
  });
}

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
  let email = document.getElementByID(urlParams.get("username"););
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
};

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
