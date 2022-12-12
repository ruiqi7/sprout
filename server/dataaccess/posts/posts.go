package posts

import (
	"database/sql"

	"github.com/ruiqi7/web-forum/server/models"
)

// Solution adapted from https://blog.logrocket.com/how-to-build-a-restful-api-with-docker-postgresql-and-go-chi/
func GetAllPosts(db *sql.DB) (*models.PostList, error) {
	list := &models.PostList{}
	rows, err := db.Query("SELECT * FROM posts")
	if err != nil {
		return list, err
	}
	defer rows.Close()
	for rows.Next() {
		var post models.Post
		err := rows.Scan(&post.ID, &post.Username, &post.Title, &post.Body, &post.Time)
		if err != nil {
			return list, err
		}
		list.Posts = append(list.Posts, post)
	}

	return list, nil
}

func GetPost(db *sql.DB, id int) (*models.Post, error) {
	post := &models.Post{}
	queryStr := "SELECT * FROM posts WHERE id=$1"
	row := db.QueryRow(queryStr, id)
	err := row.Scan(&post.ID, &post.Username, &post.Title, &post.Body, &post.Time)
	return post, err
}

func CreatePost(db *sql.DB, post models.Post) error {
	queryStr := "INSERT INTO posts (id, username, title, body, time) VALUES ($1, $2, $3, $4, $5)"
	_, err := db.Exec(queryStr, post.ID, post.Username, post.Title, post.Body, post.Time)
	return err
}

func DeletePost(db *sql.DB, id int) error {
	queryStr := "DELETE FROM posts WHERE id=$1"
	_, err := db.Exec(queryStr, id)
	return err
}

func EditPost(db *sql.DB, id int, title, body string) error {
	queryStr := "UPDATE posts SET title=$1, body=$2 where id=$3"
	_, err := db.Exec(queryStr, title, body, id)
	return err
}
