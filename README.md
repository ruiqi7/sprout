# Sprout

A web forum that allows users to initiate and contribute to discussions.

## Features

* Authenticates users by username
* Supports CRUD operations for forum threads and comments
* Allows searching of forum threads by keyword(s) and / or category

## Tech Stack

<img src="https://img.shields.io/badge/-ReactJS-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="ReactJS"/>

<img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>

<img src="https://img.shields.io/badge/-HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML"/>

<img src="https://img.shields.io/badge/-CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS"/>

<img src="https://img.shields.io/badge/-Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go"/>

<img src="https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>

## Getting Started

### Installation

* PostgreSQL
* Go
* Node.js

### Setting up the project

1. Clone this repository.
```bash
git clone https://github.com/ruiqi7/sprout.git
```

### Setting up the database

3. To start PostgreSQL, type this command into the terminal:
```bash
psql -U postgres
```
4. Enter your password when prompted.
5. Create the database named _sprout_.
```bash
CREATE DATABASE sprout;
```
6. Connect to the database.
```bash
\c sprout
```
7. To set up the tables in the database, copy and paste the contents of [this file]() into the terminal.

### Setting up the server

8. Navigate to the [server folder]().
9. Connect to the server.
```bash
go run .
```

### Setting up the client

10. Open another terminal and navigate to the [client folder]().
11. Install the dependencies.
```bash
npm install
```
12. Run the application. 
```bash
npm start
```

## License

Distributed under the MIT License. See [LICENSE]() for more information.