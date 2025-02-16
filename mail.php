<?php
if (isset($_POST['user-email'])){
    $yourEmail =  "E-mail: " . $_POST['user-email'] . "\r\n";

    $to = 'a.fomenko91@gmail.com';
    $subject = 'TheFlix - Become an affiliate';


    $headers = 'From: '. $_POST['user-email'] . "\r\n";

    $message = $yourEmail;


    $subject = preg_replace("/(\r\n)|(\r)|(\n)/", "", $subject);
    $subject = preg_replace("/(\t)/", " ", $subject);
    $subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';


    mail($to, $subject, $message, $headers);
}
?>