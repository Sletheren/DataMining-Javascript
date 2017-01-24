<?php
$str = "('4567fdgh4567dfg67f768gf";
preg_match_all("/([a-zA-Z]+|\d+)/",$str, $var);
$result = $var[1];
list($zebi, $x, $y) = $result;
print_r($var);
echo "zebi";
?>