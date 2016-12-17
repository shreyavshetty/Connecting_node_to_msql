CREATE TABLE genre (
	id int AUTO_INCREMENT,
	name varchar(30),
	PRIMARY KEY(id)	
);

CREATE TABLE books (
	id int AUTO_INCREMENT,
	genre_id int,
	name varchar(30),
	author varchar(30), 
	PRIMARY KEY(id),
	FOREIGN KEY(genre_id) references genre(id)
);
