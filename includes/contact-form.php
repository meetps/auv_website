 <?php
       // from the form
       $name = trim(strip_tags($_POST['contact_name'])); 
       $email = trim(strip_tags($_POST['contact_email']));
       $subject = trim(strip_tags(($_POST['contact_subject'])));
       $message = htmlentities($_POST['contact_message']);

       // set here
       $to = 'meetshah1995@gmail.com';

       $body = <<<HTML
$message
HTML;

       $headers = "From: $email\r\n";
       $headers .= "Content-type: text/html\r\n";

       // send the email
       mail($to, $subject, $body, $headers);

       // redirect afterwords, if needed
       header('Location:index.html#');

?>       
