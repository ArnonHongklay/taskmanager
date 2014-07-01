<? 
	include ("config/db_conn.php");
		$sql_query = mysql_query("Select MAX(SortOrder) + 1 as SortOrder from Tasks where StatusId = 'B'",$link);
		while($sort_array=mysql_fetch_array($sql_query)){
				$SortOrder=$sort_array["SortOrder"];	
				if(!$SortOrder)$SortOrder=1;
		}
		mysql_query("INSERT INTO tasks (TaskDescription,StatusId,SortOrder) VALUES ('$_POST[TaskDescription]','B',$SortOrder)") or die (mysql_error());
?>