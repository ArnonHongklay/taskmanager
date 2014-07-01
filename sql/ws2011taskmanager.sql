-- Database: `ws2011taskmanager`

CREATE TABLE Status (
	StatusId CHAR NOT NULL, 
	StatusDescription VARCHAR(255) NOT NULL, 
	PRIMARY KEY(StatusId)
) ENGINE=INNODB;

INSERT INTO Status VALUES('B','Backlog'),('I','Work-in-progress'),('D','Done');

CREATE TABLE Responsibles (
	ResponsibleId INT NOT NULL AUTO_INCREMENT, 
	Name VARCHAR(255) NOT NULL, 
	Email VARCHAR(255), 
	PRIMARY KEY(ResponsibleId)
) ENGINE=INNODB;

INSERT INTO Responsibles (`Name`,`Email`) VALUES('John', 'john@worldskills.com'), ('Sam', 'sam@worldskills.com'), ('Susan', 'susan@worldskills.com');

CREATE TABLE Tasks (
	TaskId INT NOT NULL AUTO_INCREMENT, 
	TaskDescription VARCHAR(255), 
	StartTime DATETIME, 
	EndTime DATETIME, 
	StatusId CHAR NOT NULL, 
	SortOrder INT, 
	ResponsibleId INT, 
	INDEX(ResponsibleId), 
	INDEX(StatusId),
	FOREIGN KEY (ResponsibleId) REFERENCES Responsibles (ResponsibleId),	
	FOREIGN KEY (StatusId) REFERENCES Status (StatusId), 
	PRIMARY KEY (TaskId)
) ENGINE=INNODB;

INSERT INTO Tasks (`TaskDescription`,`StartTime`,`EndTime`,`StatusId`,`ResponsibleId`,`SortOrder`) VALUES ('Draw the layout of the website',NOW(),null,'I',2,1);
INSERT INTO Tasks (`TaskDescription`,`StartTime`,`EndTime`,`StatusId`,`ResponsibleId`,`SortOrder`) VALUES ('Design the visual layout in Photosthop',null,null,'B',null,2);
INSERT INTO Tasks (`TaskDescription`,`StartTime`,`EndTime`,`StatusId`,`ResponsibleId`,`SortOrder`) VALUES ('Code the HTML from the designed layout',null,null,'B',null,1);
INSERT INTO Tasks (`TaskDescription`,`StartTime`,`EndTime`,`StatusId`,`ResponsibleId`,`SortOrder`) VALUES ('Valid the HTML',null,null,'B',null,4);
INSERT INTO Tasks (`TaskDescription`,`StartTime`,`EndTime`,`StatusId`,`ResponsibleId`,`SortOrder`) VALUES ('Create the stylesheet for the website',null,null,'B',null,3);
INSERT INTO Tasks (`TaskDescription`,`StartTime`,`EndTime`,`StatusId`,`ResponsibleId`,`SortOrder`) VALUES ('Contact client for more content detail',NOW(),'2011-10-10 23:00:00','D',1,1);