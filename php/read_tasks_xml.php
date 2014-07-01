<?php
	$link=mysql_connect("localhost","root","");
	mysql_select_db("TaskManager",$link);
	
	$xml=new DOMDocument();
	$xml->formatOutput=true;
	$xml->encoding="utf-8";
	$xml_tasks=$xml->createElement("Tasks");
	$sql_query=mysql_query("select TaskId,StatusId,date_format(StartTime,'%d/%m/%Y %H:%i:%s') as StartTime, date_format(EndTime,'%d/%m/%Y %H:%i:%s') as EndTime,TaskDescription,SortOrder,Tasks.ResponsibleId,Name,Email from tasks left join Responsibles on Tasks.ResponsibleId = Responsibles.ResponsibleId Order by StatusId, SortOrder",$link);
	while($task_array=mysql_fetch_array($sql_query)){
		$xml_task=$xml->createElement("Task");
		$xml_task->setAttribute("TaskId",$task_array["TaskId"]);
		$xml_task->setAttribute("StatusId",$task_array["StatusId"]);
		if($task_array["StartTime"]!=""){
			$xml_task->appendChild($xml->createElement("StartTime",$task_array["StartTime"]));
		}	
		if($task_array["EndTime"]!=""){
			$xml_task->appendChild($xml->createElement("EndTime",$task_array["EndTime"]));
		}
		$xml_task->appendChild($xml->createElement("Description",$task_array["TaskDescription"]));
		$xml_task->appendChild($xml->createElement("SortOrder",$task_array["SortOrder"]));		
				
		if ($task_array["ResponsibleId"]!=""){
			$responsible=$xml->createElement("Responsible");
			$responsible->setAttribute("ResponsibleId",$task_array["ResponsibleId"]);
			$responsible->appendChild($xml->createElement("Name",$task_array["Name"]));
			$responsible->appendChild($xml->createElement("Email",$task_array["Email"]));
			$xml_task->appendChild($responsible);
		}		
		$xml_tasks->appendChild($xml_task);
	}
	$xml->appendChild($xml_tasks);
	echo $xml->saveXML();
	unset($xml);
	
	mysql_close($link);
?>