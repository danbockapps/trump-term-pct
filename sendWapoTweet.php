<?php

/*
Set cron to run this once per hour, or whenever.
*/

require_once('functions.php');
global $cb;
$params = ['status' => getWapoTweetText()];

$reply = $cb->statuses_update($params);

// Uncomment this for debugging
//logtxt(print_r($reply, true));

?>
