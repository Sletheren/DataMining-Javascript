<?php 

/*$rand = rand()%2;
$array = array(1,0);
echo $array[$rand];*/
function c($n){
	return $n*($n-1) / 2;
}
function get_max($n, $m){
	return c($n-$m+1)+c(1)*($m-1);
}
function get_min($n, $m){
	$t = ($n-$n%$m)/$m;
	$c = c($t);
	$leftover = $n%$m;
	
	return $c*($m-$leftover) + $leftover*c($t);
}
$n = 3;
$m = 2;

echo get_min($n, $m)." ".get_max($n, $m);


?>