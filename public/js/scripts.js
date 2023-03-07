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
  });
