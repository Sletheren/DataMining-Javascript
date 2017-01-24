<?php
$in = "0 1 1 0 1 1 0 1 1
1 0 1 0 1 1 0 1 1
1 1 0 0 1 1 0 1 1
0 1 1 0 1 1 0 1 1
1 0 1 0 1 1 0 1 1
1 1 0 0 1 1 0 1 1
0 1 1 0 1 1 0 1 1
1 0 1 0 1 1 0 1 1
1 1 0 0 1 1 0 1 1";
$asc = [];
$time = microtime(true);
$f_axis = explode("\n", $in);
foreach($f_axis as $f => $l){
	$t_axis = explode(" ", $l);
	foreach($t_axis as $t => $v){
		if($v == 1) $asc[($f+1)."->".($t+1)] = $v;
	}
}
error_reporting(E_ALL^E_NOTICE);
$out = array();
function in_path($k, $path){
	$p = explode("|", $path);
	$count = 0;
	foreach($p as $part){
		list($e1, $e2) = explode("->", $part);
		if($e1 == $k || $e2 == $k) $count++;
	}
	return $count <= 1?true:false;
}
function get_nodes($k, $array, $path){
	foreach($array as $key=>$v){
		$new_path = $path;
		if(preg_match("/^".$k."\-/",$key)){
			$k_out = preg_replace("/^[0-9]+\-\>([0-9]+)$/", "$1", $key);
			if($k != $k_out && in_path($k_out, $path) && in_path($k, $path)){
				unset($_GET["out"][$path]);
				$new_path .= "|".$key;
				$_GET["out"][$new_path] = 1;
				unset($array[$key]);
				get_nodes($k_out, $array, $new_path);
			}
		}
	}
}
foreach($asc as $k=>$a){
	$f = preg_replace("/^([0-9]+)\-\>([0-9]+)/", "\\1", $k);
	foreach($asc as $key=>$value){
		$temp = $asc;
		unset($temp[$key]);
		get_nodes($f, $temp, "start");
	}
}
print_r($_GET["out"]);
echo "\n".((microtime(true)-$time)*1000);
?>