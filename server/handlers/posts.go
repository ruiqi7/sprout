package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/ruiqi7/sprout/server/dataaccess"
	"github.com/ruiqi7/sprout/server/database"
	"github.com/ruiqi7/sprout/server/models"
)

func GetAllPosts(w http.ResponseWriter, r *http.Request) {
	posts, err := dataaccess.GetAllPosts(database.GetDB())
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	json.NewEncoder(w).Encode(posts)
}

func GetPost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	post, err := dataaccess.GetPost(database.GetDB(), num)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	json.NewEncoder(w).Encode(post)
}

// Solution adapted from https://medium.com/swlh/building-a-restful-api-with-go-and-postgresql-494819f51810
func CreatePost(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	err = dataaccess.CreatePost(database.GetDB(), post)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
}

func DeletePost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	err = dataaccess.DeletePost(database.GetDB(), num)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
}

func EditPost(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	err := json.NewDecoder(r.Body).Decode(&post)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	err = dataaccess.EditPost(database.GetDB(), post)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
}

func SearchByCategory(w http.ResponseWriter, r *http.Request) {
	category := chi.URLParam(r, "category")
	posts, err := dataaccess.SearchByCategory(database.GetDB(), category)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	json.NewEncoder(w).Encode(posts)
}

func SearchByQuery(w http.ResponseWriter, r *http.Request) {
	query := chi.URLParam(r, "query")
	posts, err := dataaccess.SearchByQuery(database.GetDB(), query)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	json.NewEncoder(w).Encode(posts)
}

func SearchByCategoryAndQuery(w http.ResponseWriter, r *http.Request) {
	category := chi.URLParam(r, "category")
	query := chi.URLParam(r, "query")
	posts, err := dataaccess.SearchByCategoryAndQuery(database.GetDB(), category, query)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	json.NewEncoder(w).Encode(posts)
}
