<? 
	include ("config/db_conn.php");
	
	mysql_query("UPDATE tasks SET 

		StatusId='B',
		StartTime=NULL,
		EndTime=NULL,
		SortOrder=NULL,
		ResponsibleId=NULL

		WHERE TaskId=$_POST[TaskId]") or die (mysql_error());
?>