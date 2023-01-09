package models

type Comment struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Content  string `json:"content"`
	Time     string `json:"time"`
}

type CommentList struct {
	Comments []Comment `json:"comments"`
}
