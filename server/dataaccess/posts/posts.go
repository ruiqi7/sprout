package posts

import (
	"database/sql"

	"github.com/ruiqi7/web-forum/server/models"
)

// Solution below adapted from https://blog.logrocket.com/how-to-build-a-restful-api-with-docker-postgresql-and-go-chi/
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
