<?php
 $html = ' Name: '. $_POST['name'] .'
 Email: '.$_POST['email'].'
 Mobile: '.$_POST['mobile'].'
 Message: '.$_POST['message'];
$message = $html;
$subject = 'Client Enquiry (DRAQEN)'; 
$headers = 'From: support@bigappcompany.com' . "\r\n" . 'Reply-To: support@spotsoon.com' . "\r\n" . 'X-Mailer: PHP/' . phpversion(); 
$to ='ahada.mahendra@gmail.com';


//$recipients = array('ravindra.gangadhar23@gmail.com' => 'BigApp Company');

if(mail($to, $subject, $message, $headers)) {
     echo "<script>alert('Thanks For Contacting . We will contact you within 72hours');location.href=\"../index.html\"</script>";
}
else 
{ echo "<script>alert('Unable to send mail. Please try after some time.');location.href=\"../contact.html\"</script>"; 
}			
?>