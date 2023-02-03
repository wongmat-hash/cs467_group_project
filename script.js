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
    errorMessage = "Passwords do not match.";
  }

  // Create the INSERT query
  let insertQuery = "INSERT INTO users (username, email, phone, password) VALUES (?,?,?)";

  // Create an array to store the values for the query including phone which has not been used
  let insertData = [username, email, phone, password];

  // Execute the query using the db.pool.query method
  db.pool.query(insertQuery, insertData, function(error, rows, fields) {
    if (error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    else
    {
      // Redirect to the homepage or display a success message
      console.log("User registered successfully!");
      res.redirect('/login.html') //INSERT URL FOR HOME PAGE WHEN LINKING
    }
  });
}

function reset()
{
  const email = document.getElementById("email").value;

  if (email)
  {
    // send a request to the server to reset the password
    // ...
    console.log("doing something");
    // show the confirmation message
    alert("A password reset link has been sent to your email. Please check your inbox.");
  }
  else
  {
    alert("Please enter your email.");
  }
}
