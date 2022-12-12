package posts

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/ruiqi7/web-forum/server/dataaccess/posts"
	"github.com/ruiqi7/web-forum/server/database"
	"github.com/ruiqi7/web-forum/server/models"
)

func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := posts.GetAllPosts(database.GetDB())
	database.CheckError(err)
	json.NewEncoder(w).Encode(posts)
}

func GetPost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		w.WriteHeader(404)
		return
	}
	post, err := posts.GetPost(database.GetDB(), num)
	database.CheckError(err)
	json.NewEncoder(w).Encode(post)
}

// Solution adapted from https://medium.com/swlh/building-a-restful-api-with-go-and-postgresql-494819f51810
func CreatePost(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	err := json.NewDecoder(r.Body).Decode(&post)
	err = posts.CreatePost(database.GetDB(), post)
	database.CheckError(err)
	//w.Write([]byte("Post created!"))
}

func DeletePost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		w.WriteHeader(404)
		return
	}
	err = posts.DeletePost(database.GetDB(), num)
	database.CheckError(err)
}

func EditPost(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	err := json.NewDecoder(r.Body).Decode(&post)
	err = posts.EditPost(database.GetDB(), post.ID, post.Title, post.Body)
	database.CheckError(err)
}
