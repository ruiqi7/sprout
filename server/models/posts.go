package models

type Post struct {
	ID       int     `json:"id"`
	Username string  `json:"username"`
	Title    string  `json:"title"`
	Body     string  `json:"body"`
	Category string  `json:"category"`
	Time     string  `json:"time"`
	Comments []int64 `json:"comments"`
}

type PostList struct {
	Posts []Post `json:"posts"`
}
