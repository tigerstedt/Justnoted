CREATE TABLE users
(
   id serial, 
   user_name varchar(255) not null,
   user_email varchar(255) not null,
   user_password varchar (255) not null,
   user_active varchar(10) not null,
   user_created varchar(255) not null,
   PRIMARY KEY (id)
);

CREATE TABLE lists
(
   id serial,
   user_id serial,
   list_name varchar(255) not null,
   list_created varchar(255) not null,
   list_active varchar(255) not null,
   PRIMARY KEY (id),
   FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE tasks
(
   id serial,
   user_id serial,
   list_id serial,
   task_description varchar(255) not null,
   task_created varchar(255) not null
   PRIMARY KEY (id),
   FOREIGN KEY (user_id) REFERENCES users (id),
   FOREIGN KEY (list_id) REFERENCES lists (id)
);

