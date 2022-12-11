package posts

import (
	"encoding/json"
	"net/http"

	"github.com/ruiqi7/web-forum/server/dataaccess/posts"
	"github.com/ruiqi7/web-forum/server/database"
)

func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	list, err := posts.GetAllPosts(database.GetDB())
	database.CheckError(err)

	json.NewEncoder(w).Encode(list)
}

func GetPost(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("get post"))
}

func CreatePost(w http.ResponseWriter, r *http.Request) {
	// w.Header().Set("Access-Control-Allow-Origin", "*")
}
