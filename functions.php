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

function getPctTweetText($testTime = null) {
  $pct = calcPct($testTime);

  // if $pct is e.g. 7.001% or 7.002%, round down.
  if(strpos($pct, '001') !== false || strpos($pct, '002') !== false) {
    $pct = str_replace(array('001', '002'), '000', $pct);
  }

  $tweetText = $pct . " of Trump's presidential term has elapsed, unless he leaves office early.";
  return $tweetText;
}

function getProbTweetText() {
  $pct = getProbPct();

  if($pct > 0 && $pct < 100) {
    $tweetText = "There is a " . $pct .
        "% chance Donald Trump will still be president on December 31, " .
        "according to data from @PredictIt.";
    return $tweetText;
  }

  else {
    exit("Unable to get probability");
  }
}

function get538TweetText() {
  $pct = get538Pct();

  if(substr($pct, -1) == '%') {
    $tweetText = "Trump's current average approval rating is " . $pct .
        ", according to data from @FiveThirtyEight.";
    return $tweetText;
  }

  else {
    exit("Unable to get approval rating.");
  }
}

function calcPct($testTime = null) {
  $start = strToTime('2017-01-20 12:00:00');
  $end = strToTime('2021-01-20 12:00:00');

  if($testTime)
    $now = strtotime($testTime);
  else
    $now = time();

  $elapsed = $now - $start;
  $total = $end - $start;

  // There are 35,040 hours in four years.
  // One hour is 0.0029% of the four-year term.
  // So if we use three decimal places, at least the last
  // digit will change every hour.

  return sprintf("%.3f%%", $elapsed * 100 / $total);
}

function getProbPct() {
  $predictItData = json_decode(file_get_contents(
      'https://www.predictit.org/api/marketdata/ticker/TRUMP.PRES.123117'));

  return $predictItData->Contracts[0]->LastTradePrice * 100;
}

function get538Pct() {
  $data = json_decode(file_get_contents(
      'compress.zlib://' .
      'https://projects.fivethirtyeight.com/trump-approval-ratings/approval.json'));

  $today = date('Y-m-d');

  foreach($data as $row) {
    if($row->date == $today && $row->subgroup == 'All polls') {
      return sprintf("%.1f%%", $row->approve_estimate);
    }
  }
}

function echon($s) {
  echo $s . "\n";
}

function logtxt($s) {
  file_put_contents(
    'log.txt',
    date("Y-m-d G:i:s") . "\n" . $s . "\n\n",
    FILE_APPEND
  );
}

?>
