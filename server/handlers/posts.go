package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/ruiqi7/web-forum/server/dataaccess"
	"github.com/ruiqi7/web-forum/server/database"
	"github.com/ruiqi7/web-forum/server/models"
)

func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := dataaccess.GetAllPosts(database.GetDB())
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
	post, err := dataaccess.GetPost(database.GetDB(), num)
	database.CheckError(err)
	json.NewEncoder(w).Encode(post)
}

// Solution adapted from https://medium.com/swlh/building-a-restful-api-with-go-and-postgresql-494819f51810
func CreatePost(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	err := json.NewDecoder(r.Body).Decode(&post)
	err = dataaccess.CreatePost(database.GetDB(), post)
	database.CheckError(err)
}

func DeletePost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		w.WriteHeader(404)
		return
	}
	err = dataaccess.DeletePost(database.GetDB(), num)
	database.CheckError(err)
}

func EditPost(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	err := json.NewDecoder(r.Body).Decode(&post)
	err = dataaccess.EditPost(database.GetDB(), post)
	database.CheckError(err)
}

func SearchPosts(w http.ResponseWriter, r *http.Request) {
	search := chi.URLParam(r, "search")
	posts, err := dataaccess.SearchPosts(database.GetDB(), search)
	database.CheckError(err)
	json.NewEncoder(w).Encode(posts)
}
