<?php
require_once('functions.php');

echo getDaysTillElectionTweetText('2018-11-01') . "\n";
echo getDaysTillElectionTweetText('2018-10-01') . "\n";
echo getDaysTillElectionTweetText('2018-09-01') . "\n";
echo getDaysTillElectionTweetText('2018-08-01') . "\n";
echo getDaysTillElectionTweetText('2018-07-01') . "\n";
echo getDaysTillElectionTweetText('2018-06-01') . "\n";
echo getDaysTillElectionTweetText('2018-05-01') . "\n";
echo getDaysTillElectionTweetText('2018-04-01') . "\n";
echo getDaysTillElectionTweetText() . "\n";

//echo getWapoTweetText();


//echo get538approval();

//echon(calcPct());
//echon(getPctTweetText());

// echon(getPctTweetText('2019-10-25 14:00:00'));
// echon(getPctTweetText('2019-10-25 15:00:00'));
// echon(getPctTweetText('2017-05-02 20:00:00'));


/*
$testTime = strtotime('2017-05-31 11:00:00');

for($i=0; $i<31990; $i++) {
  $pct = calcPct(date('Y-m-d H:i:s', $testTime));
  if(strpos($pct, '000%') || strpos($pct, '001%') || strpos($pct, '002%')) {
    echon(date('Y-m-d H:i:s', $testTime) . ' ' . $pct);
  }

  $testTime = strtotime('+1 hour', $testTime);
}
*/

// logtxt('This is a test log');

// echon(getProbTweetText());

?>
