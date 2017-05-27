<?php

/*
Set cron to run this once every four hours, or whenever.
*/

require_once('functions.php');
global $cb;
$params = ['status' => getProbTweetText()];

$reply = $cb->statuses_update($params);

// Uncomment this for debugging
// logtxt(print_r($reply, true));

?>
