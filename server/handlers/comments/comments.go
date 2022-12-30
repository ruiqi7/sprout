package comments

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	commments "github.com/ruiqi7/web-forum/server/dataaccess/comments"
	"github.com/ruiqi7/web-forum/server/database"
	"github.com/ruiqi7/web-forum/server/models"
)

func GetAllComments(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		w.WriteHeader(404)
		return
	}
	comments, err := commments.GetAllComments(database.GetDB(), num)
	database.CheckError(err)
	json.NewEncoder(w).Encode(comments)
}

func GetComment(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		w.WriteHeader(404)
		return
	}
	comment, err := commments.GetComment(database.GetDB(), num)
	database.CheckError(err)
	json.NewEncoder(w).Encode(comment)
}

func CreateComment(w http.ResponseWriter, r *http.Request) {
	var comment models.Comment
	err := json.NewDecoder(r.Body).Decode(&comment)
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		w.WriteHeader(404)
		return
	}
	err = commments.CreateComment(database.GetDB(), comment, num)
	database.CheckError(err)
}

func DeleteComment(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	num, err := strconv.Atoi(id)
	if err != nil {
		w.WriteHeader(404)
		return
	}
	err = commments.DeleteComment(database.GetDB(), num)
	database.CheckError(err)
}

func EditComment(w http.ResponseWriter, r *http.Request) {
	var comment models.Comment
	err := json.NewDecoder(r.Body).Decode(&comment)
	err = commments.EditComment(database.GetDB(), comment.ID, comment.Content)
	database.CheckError(err)
}
