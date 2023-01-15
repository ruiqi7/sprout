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

func GetAllComments(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	comments, err := dataaccess.GetAllComments(database.GetDB(), num)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	json.NewEncoder(w).Encode(comments)
}

func GetComment(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	comment, err := dataaccess.GetComment(database.GetDB(), num)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
	json.NewEncoder(w).Encode(comment)
}

func CreateComment(w http.ResponseWriter, r *http.Request) {
	var comment models.Comment
	err := json.NewDecoder(r.Body).Decode(&comment)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		w.WriteHeader(404)
		return
	}

	err = dataaccess.CreateComment(database.GetDB(), comment, num)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
}

func DeleteComment(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, http.StatusText(404), 404)
		return
	}

	err = dataaccess.DeleteComment(database.GetDB(), num)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
}

func EditComment(w http.ResponseWriter, r *http.Request) {
	var comment models.Comment
	err := json.NewDecoder(r.Body).Decode(&comment)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	err = dataaccess.EditComment(database.GetDB(), comment.ID, comment.Content)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}
}
