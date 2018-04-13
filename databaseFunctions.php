<?php
function pdo_connect() {
  try {
    $dbh = new PDO(
      "mysql:host=localhost;dbname=" . DATABASENAME,
      DATABASEUSERNAME,
      DATABASEPASSWORD
    );
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  }
  catch(PDOException $e) {
    echo $e->getMessage();
  }

  return $dbh;
}

function pdo_upsert($sql, $qs = null) {
  $dbh = pdo_connect();
  $sth = $dbh->prepare($sql);
  return $sth->execute(is_array($qs) ? $qs : array($qs));
}

function pdo_select($query, $qs = null) {
  $dbh = pdo_connect();
  $sth = $dbh->prepare($query);
  $sth->setFetchMode(PDO::FETCH_ASSOC);
  $sth->execute(is_array($qs) ? $qs : array($qs));
  return $sth->fetchAll();
}

function select_one_record($query, $qs = null) {
  $sorqr = pdo_select($query, $qs);
  if(count($sorqr) == 0)
    return null;
  else if(count($sorqr) == 1)
    return $sorqr[0];
  else
    throw new Exception("Unexpected records returned.");
}
?>
