package posts

import (
	"database/sql"

	"github.com/lib/pq"
	"github.com/ruiqi7/web-forum/server/models"
)

// Solution adapted from https://blog.logrocket.com/how-to-build-a-restful-api-with-docker-postgresql-and-go-chi/
func GetAllPosts(db *sql.DB) (*models.PostList, error) {
	list := &models.PostList{}
	rows, err := db.Query("SELECT * FROM posts ORDER BY time DESC")
	if err != nil {
		return list, err
	}
	defer rows.Close()
	for rows.Next() {
		var post models.Post
		comments := pq.Int64Array{}
		err := rows.Scan(&post.ID, &post.Username, &post.Title, &post.Body, &post.Time, &comments)
		if err != nil {
			return list, err
		}
		post.Comments = []int64(comments)
		list.Posts = append(list.Posts, post)
	}

	return list, nil
}

func GetPost(db *sql.DB, id int) (*models.Post, error) {
	post := &models.Post{}
	comments := pq.Int64Array{}
	queryStr := "SELECT * FROM posts WHERE id=$1"
	row := db.QueryRow(queryStr, id)
	err := row.Scan(&post.ID, &post.Username, &post.Title, &post.Body, &post.Time, &comments)
	post.Comments = []int64(comments)
	return post, err
}

func CreatePost(db *sql.DB, post models.Post) error {
	queryStr := "INSERT INTO posts (username, title, body, time) VALUES ($1, $2, $3, current_timestamp)"
	_, err := db.Exec(queryStr, post.Username, post.Title, post.Body)
	return err
}

func DeletePost(db *sql.DB, id int) error {
	queryStr := "DELETE FROM posts WHERE id=$1"
	_, err := db.Exec(queryStr, id)
	return err
}

func EditPost(db *sql.DB, id int, title, body string) error {
	queryStr := "UPDATE posts SET title=$1, body=$2 WHERE id=$3"
	_, err := db.Exec(queryStr, title, body, id)
	return err
}

func AddComment(db *sql.DB, id, commentID int) error {
	queryStr := "UPDATE posts SET comments=array_append(comments, $1) WHERE id=$2"
	_, err := db.Exec(queryStr, commentID, id)
	return err
}
