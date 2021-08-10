CREATE TABLE events(
    id serial, 
    name character varying(2000), 
    time time,
    description character varying(65500)
); 

CREATE TABLE users(
    id serial, 
    name character varying(2000)
); 

CREATE TABLE attendees(
    event_name character varying(2000),
    event_id integer,
    user_id integer
); 

CREATE TABLE tasks(
    id serial, 
    event_id integer,
    name character varying(65500),
    link character varying(65500)
); 

CREATE TABLE user_tasks(
    user_id integer,
    task_id integer, 
    completed boolean
); 

INSERT INTO events(name, time, description) 
VALUES ('The Origins of the Universe', '00:11:15', 'An introduction to space science and the wonders it has to hold. Go space!'); 

INSERT INTO events(name, time, description) 
VALUES ('STEM World', '00:11:15', 'An introduction to space science and the wonders it has to hold. Go space!'); 

INSERT INTO users(name)
VALUES ('Diana');

INSERT INTO attendees(event_name, event_id, user_id) 
VALUES ('STEM World',2,1); 

INSERT INTO tasks(event_id, name, link)
VALUES (2, 'Dummy ToDo Item', 'https://localhost:8080'); 

INSERT INTO user_tasks(user_id, task_id)
VALUES(1, 1); 