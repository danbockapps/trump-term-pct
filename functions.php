<?php
date_default_timezone_set('America/New_York');

require_once('libraries/codebird.php');
$cb = \Codebird\Codebird::getInstance();

foreach(parse_ini_file("auth.ini") as $key => $value) {
  define($key, $value);
}

$requiredConstants = array(
  'TWITTER_CONSUMER_KEY',
  'TWITTER_CONSUMER_SECRET',
  'OAUTH_TOKEN',
  'OAUTH_SECRET',
);

foreach($requiredConstants as $rc) {
  if(!defined($rc)) {
    throw new Exception('Required constant not defined: ' + $rc);
  }
}

\Codebird\Codebird::setConsumerKey(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET);
$cb->setToken(OAUTH_TOKEN, OAUTH_SECRET);


function calcPct() {
  $start = strToTime('2017-01-20 12:00:00');
  $end = strToTime('2021-01-20 12:00:00');
  $now = time();

  $elapsed = $now - $start;
  $total = $end - $start;

  // There are 35,040 hours in four years.
  // One hour is 0.0029% of the four-year term.
  // So if we use three decimal places, at least the last
  // digit will change every hour.

  return sprintf("%.3f%%", $elapsed * 100 / $total);
}

function echon($s) {
  echo $s . "\n";
}

?>
