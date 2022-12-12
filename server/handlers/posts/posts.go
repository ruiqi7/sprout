package posts

import (
	"encoding/json"
	"net/http"

	"github.com/ruiqi7/web-forum/server/dataaccess/posts"
	"github.com/ruiqi7/web-forum/server/database"
	"github.com/ruiqi7/web-forum/server/models"
)

func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	list, err := posts.GetAllPosts(database.GetDB())
	database.CheckError(err)
	json.NewEncoder(w).Encode(list)
}

func GetPost(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("get post"))
}

// Solution adapted from https://medium.com/swlh/building-a-restful-api-with-go-and-postgresql-494819f51810
func CreatePost(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	err := json.NewDecoder(r.Body).Decode(&post)
	err = posts.CreatePost(database.GetDB(), post)
	database.CheckError(err)
	//w.Write([]byte("Post created!"))
}
