<? 
	include ("db_config.php");
	
	if (!$link=mysql_connect($db_server,$db_user,$db_password)){
		die ("An error has occurred while trying to connect to the database server");	
	}else {
		if (!mysql_select_db($db_name,$link)){
			die ("An error has occurred while trying to select the database");	
		}	
	}
?>