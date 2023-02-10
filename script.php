<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Your Sendinblue API key
    $apiKey = "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";

    // The email address that will be used as the sender
    $senderEmail = "crowdsourcedtravelplanner@sendinblue.com";

    // The email address that will receive the password reset email
    $recipientEmail = $email;

    // The subject of the password reset email
    $subject = "Password Reset";

    // The body of the password reset email
    $body = "Your new password is: " . $password;

    // Prepare the data for the API call
    $data = [
        "sender" => [
            "email" => $senderEmail,
        ],
        "to" => [
            [
                "email" => $recipientEmail,
            ],
        ],
        "subject" => $subject,
        "htmlContent" => $body,
    ];

    // Use the Sendinblue API to send the password reset email
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.sendinblue.com/v3/smtp/email");
    curl_setopt($ch, CURLOPT_RETURNTR
