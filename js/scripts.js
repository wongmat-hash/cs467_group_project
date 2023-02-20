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
