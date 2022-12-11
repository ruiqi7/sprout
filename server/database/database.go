package database

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "password"
	dbname   = "forum"
)

// Solution below adapted from https://medium.com/swlh/building-a-restful-api-with-go-and-postgresql-494819f51810
func GetDB() *sql.DB {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", connStr)
	CheckError(err)

	err = db.Ping()
	CheckError(err)

	fmt.Println("The database is connected!")
	return db
}

func CheckError(err error) {
	if err != nil {
		panic(err)
	}
}
