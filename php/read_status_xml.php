<?php
	$link=mysql_connect("localhost","root","");
	mysql_select_db("ws2011taskmanager",$link);
	
	$xml=new DOMDocument();
	$xml->formatOutput=true;
	$xml->encoding="utf-8";

	$xml_status=$xml->createElement("Status");
	$sql_query=mysql_query("select StatusId,StatusDescription from status",$link);
	while($status_array=mysql_fetch_array($sql_query)){
		$xml_item=$xml->createElement("Item");
		$xml_item->setAttribute("StatusId",$status_array["StatusId"]);
		$xml_item->appendChild($xml->createElement("StatusDescription",$status_array["StatusDescription"]));
		$xml_status->appendChild($xml_item);
	}
	$xml->appendChild($xml_status);
	echo $xml->saveXML();
	
	mysql_close($link);
?>