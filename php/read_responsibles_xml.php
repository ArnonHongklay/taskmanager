<?php
	$link=mysql_connect("localhost","root","");
	mysql_select_db("TaskManager",$link);
	
	$xml=new DOMDocument();
	$xml->formatOutput=true;
	$xml->encoding="utf-8";

	$xml_responsibles=$xml->createElement("Responsibles");
	$sql_query=mysql_query("select ResponsibleId,Name,Email from responsibles",$link);
	while($responsible_array=mysql_fetch_array($sql_query)){
		$xml_item=$xml->createElement("Responsible");
		$xml_item->setAttribute("ResponsibleId",$responsible_array["ResponsibleId"]);
		$xml_item->appendChild($xml->createElement("Name",$responsible_array["Name"]));
		$xml_item->appendChild($xml->createElement("Email",$responsible_array["Email"]));
		$xml_responsibles->appendChild($xml_item);
	}
	$xml->appendChild($xml_responsibles);
	echo $xml->saveXML();
	
	mysql_close($link);
?>