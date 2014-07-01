<? 
	include ("config/db_conn.php");
	
	mysql_query("UPDATE tasks SET StatusId='D',EndTime=NOW() WHERE TaskId=$_POST[TaskId]") or die (mysql_error());
?>