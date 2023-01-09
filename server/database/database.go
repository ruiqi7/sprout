package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "forum"
)

var db *sql.DB

// Solution below adapted from https://medium.com/swlh/building-a-restful-api-with-go-and-postgresql-494819f51810
func ConnectDB() *sql.DB {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	database, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalln(err)
	}

	db = database
	return db
}

func GetDB() *sql.DB {
	err := db.Ping()
	if err != nil {
		log.Fatalln(err)
	}
	return db
}
