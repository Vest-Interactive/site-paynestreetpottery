<?php 
ini_set('display_errors', 'On');

if(isset($_POST) && isset($_POST['contact']))
{

	require('../../../../../wp-load.php');

	//If this exists then it will fall into the workwithus block otherwise, hit the workforus block.
	//$contact = $_POST['contact'];
	$contact = json_decode(stripslashes($_POST['contact']), true);

	//print_r($contact);

	if (!isset($contact['action'])) {
		echo json_encode(array('success' => 0));
		exit;
	}

	if(isset($_POST['contact']) && $contact['action'] == 'message')
	{
		echo json_encode(array( "success" => 1));
	}
	else if (isset($_POST['contact']) && $contact['action'] == 'signup')
	{

		$name = $contact['name'];
		$email = $contact['email'];
		$phone = $contact['phone'];
		$event = $contact['theEvent'];

		// Emailing
		// $to_Email       = "andrews@vestadvertising.com"; 
		// $subject        = '[Registration]'; 

		// 	# Mail headers for plain text mail
		// 	$headers = 'From: '.$email.'' . "\r\n" .
		// 	'Reply-To: '.$email.'' . "\r\n" .
		// 	'X-Mailer: PHP/' . phpversion();

		// $user_Message = "Name : ". $name . "\n" .
		// 				"phone : ". $phone . "\n" .
		// 				"email : ". $email . "\n";

		// //send the mail
		// $sentMail = @mail($to_Email, $subject, $user_Message, $headers);

		// Posts Meta
		$post_id = $event['id'];
		$meta_key = 'seats_available';
		$meta_value = $event['seats'] -1;

		$update = update_post_meta($post_id, $meta_key, $meta_value);

		echo json_encode(array("success" => 1));
		//echo json_encode(array( "success" => 1, "updated" => $update ));

		// $to_Email       = "andrews@vestadvertising.com"; 
		// $subject        = '[Registration]'; 

		// 	# Mail headers for plain text mail
		// 	$headers = 'From: '.$email.'' . "\r\n" .
		// 	'Reply-To: '.$email.'' . "\r\n" .
		// 	'X-Mailer: PHP/' . phpversion();

		// $user_Message = "Name : ". $name . "\n" .
		// 				"heardfrom : ". $heardfrom . "\n";

		// //send the mail
		// //$sentMail = @mail($to_Email, $subject, $user_Message, $headers);

		// $resultEmail = $sentMail;

		// // Return our result
		// //$result = $json_response;
		// //
		// print_r("shin");


		// Did it get sent successfully?
		// if($sentMail != 0)
		// {
		// 	echo json_encode(array( "success" => 1));
		// }
		// else
		// {
		//    echo json_encode(array( "success" => 0));
		// }
	}
	else if (isset($_POST['contact']) && $contact['action'] == 'waitlist')
	{
		$name = $contact['name'];
		$email = $contact['email'];
		$phone = $contact['phone'];
		$event = $contact['theEvent'];

		// Emailing
		// $to_Email       = "andrews@vestadvertising.com"; 
		// $subject        = '[Registration]'; 

		// 	# Mail headers for plain text mail
		// 	$headers = 'From: '.$email.'' . "\r\n" .
		// 	'Reply-To: '.$email.'' . "\r\n" .
		// 	'X-Mailer: PHP/' . phpversion();

		// $user_Message = "Name : ". $name . "\n" .
		// 				"phone : ". $phone . "\n" .
		// 				"email : ". $email . "\n";

		// //send the mail
		// $sentMail = @mail($to_Email, $subject, $user_Message, $headers);

		echo json_encode(array("success" => 1));
	}
}

?>