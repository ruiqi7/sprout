package models

type Post struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Title    string `json:"title"`
	Body     string `json:"body"`
	Time     string `json:"time"`
}

type PostList struct {
	Posts []Post `json:"posts"`
}
