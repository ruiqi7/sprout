package dataaccess

import (
	"database/sql"

	"github.com/ruiqi7/sprout/server/models"
)

func GetUserID(db *sql.DB, user models.User) (int, error) {
	var id int
	queryStr := "SELECT id FROM users WHERE username=$1"
	err := db.QueryRow(queryStr, user.Username).Scan(&id)
	if err == nil {
		return id, nil
	}

	queryStr = "INSERT INTO users (username) VALUES ($1) RETURNING id"
	err = db.QueryRow(queryStr, user.Username).Scan(&id)
	if err != nil {
		return id, err
	}

	return id, nil
}
