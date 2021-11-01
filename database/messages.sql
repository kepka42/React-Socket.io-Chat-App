CREATE TABLE messages (
  id char(8) PRIMARY KEY NOT NULL,
  room_id char(36) REFERENCES rooms(id) NOT NULL,
  user_id char(8) NOT NULL,
  sender_name varchar(30) NOT NULL,
  message TEXT NOT NULL,
  create_time timestamp NOT NULL
);