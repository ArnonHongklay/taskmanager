<? 
	include ("config/db_conn.php");
	
	mysql_query("DELETE FROM tasks WHERE TaskId=$_POST[TaskId]") or die (mysql_error());
?>