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
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Validate the input
    if(!fullName)
    {
        alert("Please enter your full name");
        return;
    }
    if(!email)
    {
        alert("Please enter your email");
        return;
    }
    if(!password)
    {
        alert("Please enter a password");
        return;
    }
    if(!confirmPassword)
    {
        alert("Please confirm your password");
        return;
    }
    if(password !== confirmPassword)
    {
        alert("Passwords do not match");
        return;
    }

    // Check if email is already used
    // ...

    // If everything is valid, then send the data to the server to save it
    // ...
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
