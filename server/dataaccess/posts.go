package dataaccess

import (
	"database/sql"

	"github.com/lib/pq"
	"github.com/ruiqi7/sprout/server/models"
)

// Solution adapted from https://blog.logrocket.com/how-to-build-a-restful-api-with-docker-postgresql-and-go-chi/
func GetAllPosts(db *sql.DB) (*models.PostList, error) {
	queryStr := "SELECT id, username, title, body, category, time, comments FROM posts ORDER BY time DESC"
	rows, err := db.Query(queryStr)
	return getPostList(rows, err)
}

func GetPost(db *sql.DB, id int) (*models.Post, error) {
	post := &models.Post{}
	comments := pq.Int64Array{}
	queryStr := "SELECT id, username, title, body, category, time, comments FROM posts WHERE id=$1"
	row := db.QueryRow(queryStr, id)
	err := row.Scan(&post.ID, &post.Username, &post.Title, &post.Body, &post.Category, &post.Time, &comments)
	post.Comments = []int64(comments)
	return post, err
}

func CreatePost(db *sql.DB, post models.Post) error {
	queryStr := "INSERT INTO posts (username, title, body, category, time, title_tokens, body_tokens) VALUES ($1, $2, $3, $4, current_timestamp, to_tsvector($2), to_tsvector($3))"
	_, err := db.Exec(queryStr, post.Username, post.Title, post.Body, post.Category)
	return err
}

func DeletePost(db *sql.DB, id int) error {
	var comments pq.Int64Array
	queryStr := "DELETE FROM posts WHERE id=$1 RETURNING comments"
	row := db.QueryRow(queryStr, id)
	err := row.Scan(&comments)
	if err != nil {
		return err
	}

	err = DeleteComments(db, comments)
	return err
}

func EditPost(db *sql.DB, post models.Post) error {
	queryStr := "UPDATE posts SET title=$1, body=$2, category=$3, title_tokens=to_tsvector($1), body_tokens=to_tsvector($2) WHERE id=$4"
	_, err := db.Exec(queryStr, post.Title, post.Body, post.Category, post.ID)
	return err
}

func AddComment(db *sql.DB, id, commentID int) error {
	queryStr := "UPDATE posts SET comments=array_append(comments, $1) WHERE id=$2"
	_, err := db.Exec(queryStr, commentID, id)
	return err
}

func DeleteCommentID(db *sql.DB, commentID int) error {
	queryStr := "UPDATE posts SET comments=array_remove(comments, $1) WHERE $1=any(comments)"
	_, err := db.Exec(queryStr, commentID)
	return err
}

func SearchByCategory(db *sql.DB, category string) (*models.PostList, error) {
	queryStr := "SELECT id, username, title, body, category, time, comments FROM posts WHERE category=$1 ORDER BY time DESC"
	rows, err := db.Query(queryStr, category)
	return getPostList(rows, err)
}

func SearchByQuery(db *sql.DB, query string) (*models.PostList, error) {
	queryStr := "SELECT id, username, title, body, category, time, comments FROM posts WHERE ((title_tokens || body_tokens) @@ to_tsquery($1)) ORDER BY ts_rank(setweight(title_tokens, 'A') || setweight(body_tokens, 'B'), to_tsquery($1)) DESC, time DESC"
	rows, err := db.Query(queryStr, query)
	return getPostList(rows, err)
}

// Solution adapted from
// https://www.crunchydata.com/blog/postgres-full-text-search-a-search-engine-in-a-database
// https://dba.stackexchange.com/questions/275359/pg-fulltext-search-boost-factor-for-word-in-the-title
func SearchByCategoryAndQuery(db *sql.DB, category, query string) (*models.PostList, error) {
	queryStr := "SELECT id, username, title, body, category, time, comments FROM posts WHERE category=$1 AND ((title_tokens || body_tokens) @@ to_tsquery($2)) ORDER BY ts_rank(setweight(title_tokens, 'A') || setweight(body_tokens, 'B'), to_tsquery($2)) DESC, time DESC"
	rows, err := db.Query(queryStr, category, query)
	return getPostList(rows, err)
}

func getPostList(rows *sql.Rows, err error) (*models.PostList, error) {
	list := &models.PostList{}
	if err != nil {
		return list, err
	}
	defer rows.Close()
	for rows.Next() {
		var post models.Post
		comments := pq.Int64Array{}
		err := rows.Scan(&post.ID, &post.Username, &post.Title, &post.Body, &post.Category, &post.Time, &comments)
		if err != nil {
			return list, err
		}
		post.Comments = []int64(comments)
		list.Posts = append(list.Posts, post)
	}

	return list, nil
}
