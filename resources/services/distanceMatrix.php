<?php

$originLatLng      = $_GET['origins'];
$destinationLatLng = $_GET['destinations'];

// $json = file_get_contents("https://maps.googleapis.com/maps/api/distancematrix/json?origins={$originLatLng}&destinations={$destinationLatLng}");
// echo $json;
// die;

echo("https://maps.googleapis.com/maps/api/distancematrix/json?origins={$originLatLng}&destinations={$destinationLatLng}");
die;
// curl_setopt($ch, CURLOPT_HEADER, 0);
// // curl_setopt($ch, CURLOPT_GET, 1);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// $output = curl_exec($ch);      
// curl_close($ch);
// echo $output;
// die;

?>