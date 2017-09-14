# Lab 18 - AWS SDK
## Tim Turner
=====================================

### Description

This app is a basic auth server.  There is a user section and a todo list section.  For the user section, you can send POST and GET requests to the server and get a response.  The valid API endpoints are `/api/signup` and `/api/signin`.  Signup will create a user and return their token given a valid username, password, and email.  Signin will return a new user token given the correct username and password.  For the todo list section, you can send a POST, GET, PUT, and DELETE request to the server.  The valid endpoint for this is `/api/todo`.

To run the server, you must have NodeJS installed.  You also have to run npm install to download the npm required modules.  These commands listed below to interact with the server require HTTPie to be installed on your computer.  After you have those done, type "npm run start" in the terminal window.  The server will now be running.

This server uses MongoDB for data storage.  To run the database you must have MongoDB installed.  Type "npm run start-db" to start the mongo server

To send requests to the server, in another terminal windows, type some of the following commands.


`http POST localhost:5000/api/signup username='username' password='password' email='email@email.com'` should create a new user named Joe with a password and email attached and return a message with the user's hash if successful.

`http -a username:password localhost:5000/api/signin` should return the user's hash if the input username and password are valid.

`http POST localhost:5000/api/todo/ name="todo list name" desc="todo list description" priority="priority of todo list" 'Authorization:Bearer token'` should create a new todo list.  

`http GET localhost:5000/api/todo/:_id 'Authorization:Bearer token'` should get the todo list by id.

`http PUT localhost:5000/api/todo/:_id name="todo list name" desc="todo list description" priority="priority of todo list" 'Authorization:Bearer token'` should update the todo list with changes made to name, desc, or priority.

`http DELETE localhost:5000/api/todo/:_id 'Authorization:Bearer token'` should delete the todo list by id.


Type control + C to stop the server.

example requests:

`http POST localhost:5000/api/signup username="Joe" password="imjoedirt" email="joe@dirt.com"`

`http -a Joe:imjoedirt localhost:5000/api/signin`

`http POST localhost:5000/api/signup username="Bill" password="ghostbusters" email="bill@murray.com"`

`http -a Bill:ghostbusters localhost:5000/api/signin`

`http POST localhost:5000/api/todo/ name='Todo List' desc='Stuff todo around the house' priority=low 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjliY2NhMTRlMWVlZDdkMDM4MjE1NDY5NzYyNjZiZGI4N2Q5NTM0OTRmNmEwZDgyM2UzZmUxODNkMmJkZjEzZjEiLCJpYXQiOjE1MDUyNTQwMTh9.yQ2MnjBWu85wyYvTfNgA1m7glQAx9Kg1VTFF1oi83O4'`

`http GET localhost:5000/api/todo/59b85ade4fdfc36219eac87b 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjliY2NhMTRlMWVlZDdkMDM4MjE1NDY5NzYyNjZiZGI4N2Q5NTM0OTRmNmEwZDgyM2UzZmUxODNkMmJkZjEzZjEiLCJpYXQiOjE1MDUyNTQwMTh9.yQ2MnjBWu85wyYvTfNgA1m7glQAx9Kg1VTFF1oi83O4'`

`http PUT localhost:5000/api/todo/59b85ade4fdfc36219eac87b name='Todo List' desc='Stuff todo around the house' priority=medium 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjliY2NhMTRlMWVlZDdkMDM4MjE1NDY5NzYyNjZiZGI4N2Q5NTM0OTRmNmEwZDgyM2UzZmUxODNkMmJkZjEzZjEiLCJpYXQiOjE1MDUyNTQwMTh9.yQ2MnjBWu85wyYvTfNgA1m7glQAx9Kg1VTFF1oi83O4'`

`http DELETE localhost:5000/api/todo/59b86389b7879a691f296741 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjliY2NhMTRlMWVlZDdkMDM4MjE1NDY5NzYyNjZiZGI4N2Q5NTM0OTRmNmEwZDgyM2UzZmUxODNkMmJkZjEzZjEiLCJpYXQiOjE1MDUyNTQwMTh9.yQ2MnjBWu85wyYvTfNgA1m7glQAx9Kg1VTFF1oi83O4'`
