# Projects Application

## Table of contents
* [Web Services](#web-services)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Contact](#contact)

## Web Services  
#### Path web WSDL:  
>Projects API Service :
* http://localhost:4044/projects
>Tasks API Service :
* http://localhost:4044/projects/tasks

## Technologies
The application is built with the following dependencies:
* Nest Js
* TypeORM
* Git for versioning    
* PostgreSQL for Database  
* Config Service for environment variables
* Swagger Implementation
* Redis for faster queries

## Setup
1 - Clone the repository in your workspace `git clone https://github.com/hassanrbh/backend-api`
2 - npm install
3 - go to development.env and change the configs to your Postgres Database
  -> DATABASE_HOST = localhost
  -> DATABASE_NAME = the name of your database
  -> DATABASE_USER = the username of the database
  -> DATABASE_PASSWORD = the password of the database
  -> DATABASE_PORT = 5432
4 - Run this maven command in your project root directory `npm run build && npm run start:prod`  
Note:  
Make sure your `4044` port is not already in use.  

## Features   
* Add / Update / Delete / fetch Projects.
* Add / Update / Delete / fetch Tasks.
* Associate a project to a tasks.

TODO list by priority:  
* Adding authentication with jwt
