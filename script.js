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

//workcited: https://www.sendinblue.com/blog/send-transactional-emails-with-next-js-and-sendinblue/

const axios = require("axios");

async function sendPasswordResetEmail(email, password)
{
    console.log("in send password reset now");
    const API_KEY = "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";
    const SENDER = "crowdsourcedtravelplanner@gmail.com";

    const requestBody =
    {
        to: [{ email: email }],
        sender: { email: SENDER },
        subject: "Password Reset",
        htmlContent: `Your new password is: ${password}`
    };

    try {
        const response = await axios.post(
            "https://api.sendinblue.com/v3/smtp/email",
            requestBody,
            {
                headers: {
                    "api-key": API_KEY,
                    "content-type": "application/json"
                }
            }
        );

        console.log("Message sent:", response.data);
    } catch (error) {
        console.error(error.message);
    }
}
