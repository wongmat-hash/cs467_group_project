function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    //validate input and check with database
    //if match load the home page
    //if it doesnt show error prompt in login/ registration page
}

function register() {
    var fullName = document.getElementByID("fullName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    // Validate the input
    // check if password and confirmPassword match
    // check if email is already used or not
    // If everything is valid, then send the data to the server to save it
    // If it's not valid show an error message
}
