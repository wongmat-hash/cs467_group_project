//PROFILE PAGE NEEDS THIS LOGIC: <a href="resetPassword.html?username=user123">Reset Password</a>
//LINK TO THIS PAGE AND FUNCTION
//this function will reset the password from the user designated form
function newpassword() {
    //stores the value of the new password/ email
    let email = document.getElementById("email").value;
    let passwordreset = document.getElementById("newpassword").value;
    if (passwordreset == "" || email == "") {
        alert("all fields must be completed");
        return false;
    }
    // error handling for email portion
    let checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    let checkEmailData = [email];
    db.pool.query(checkEmailQuery, checkEmailData, function(error, results)
    {
        if (error)
        {
            console.error("Error executing query:", error.stack);
            alert("email not found...")
            res.write(JSON.stringify(error));
            return;
        }

        if (results.length > 0)
        {
            // we found a match and email exists
            console.error("email found resetting");
            connection.release();
            return;
        }
    let updatePasswordQuery = "UPDATE Users SET password = ? WHERE email = ?";
    // pass our data in
    let updatePasswordData = [passwordreset, email];
    // open connection and pass in our info
    db.pool.query(updatePasswordQuery, updatePasswordData, function(error, result)
    {
        if (error)
        {
            res.write(JSON.stringify(error));
            return;
        }
        else
        {
            alert("Password reset successful!");
            sendPasswordResetEmail(email, passwordreset)
        }
    });
  }
)};

function sendPasswordResetEmail(email, password) {
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
