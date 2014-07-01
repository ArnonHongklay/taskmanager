<? 
	include ("config/db_conn.php");
	
	if ($_POST['StatusId']=='I'){
		$TimeColumn="StartTime";	
	}else {
		$TimeColumn="EndTime";	
	}
	mysql_query("UPDATE tasks SET StatusId='I',SortOrder=$_POST[SortOrder],ResponsibleId=$_POST[ResponsibleId],$TimeColumn=NOW() WHERE TaskId=$_POST[TaskId]") or die (mysql_error());
?>