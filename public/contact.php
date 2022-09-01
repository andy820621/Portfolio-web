<?php
    $name = $_POST['name'];
    $email= $_POST['email'];
    $subject= $_POST['subject'];
    $message= $_POST['message'];
    $to = "andy820621@gmail.com";
    $txt ="Name : ". $name ."\r\n  Email : " . $email ."\r\n Message =" . $message;
    $headers = "From: hsieh-yao-tsu.com" . "\r\n" .
    "CC: somebodyelse@example.com";
    if($email!=NULL){
        mail($to,$subject,$txt,$headers);
    }
?>