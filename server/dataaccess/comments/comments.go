package commments

import (
	"database/sql"

	"github.com/lib/pq"
	"github.com/ruiqi7/web-forum/server/dataaccess/posts"
	"github.com/ruiqi7/web-forum/server/models"
)

func GetAllComments(db *sql.DB, id int) (*models.CommentList, error) {
	list := &models.CommentList{}

	post, err := posts.GetPost(db, id)
	if err != nil {
		return list, err
	}

	comments := post.Comments
	queryStr := "SELECT * FROM comments WHERE id=any($1) ORDER BY time DESC"
	rows, err := db.Query(queryStr, pq.Array(comments))
	if err != nil {
		return list, err
	}
	defer rows.Close()
	for rows.Next() {
		var comment models.Comment
		err := rows.Scan(&comment.ID, &comment.Username, &comment.Content, &comment.Time)
		if err != nil {
			return list, err
		}
		list.Comments = append(list.Comments, comment)
	}

	return list, nil
}

func GetComment(db *sql.DB, id int) (*models.Comment, error) {
	comment := &models.Comment{}
	queryStr := "SELECT * FROM comments WHERE id=$1"
	row := db.QueryRow(queryStr, id)
	err := row.Scan(&comment.ID, &comment.Username, &comment.Content, &comment.Time)
	return comment, err
}

func CreateComment(db *sql.DB, comment models.Comment, postID int) error {
	var id int
	queryStr := "INSERT INTO comments (username, content, time) VALUES ($1, $2, current_timestamp) RETURNING id"
	err := db.QueryRow(queryStr, comment.Username, comment.Content).Scan(&id)
	if err != nil {
		return err
	}

	err = posts.AddComment(db, postID, id)
	return err
}

func DeleteComment(db *sql.DB, id int) error {
	queryStr := "DELETE FROM comments WHERE id=$1"
	_, err := db.Exec(queryStr, id)
	return err
}

func EditComment(db *sql.DB, id int, content string) error {
	queryStr := "UPDATE comments SET content=$1, WHERE id=$2"
	_, err := db.Exec(queryStr, content, id)
	return err
}
