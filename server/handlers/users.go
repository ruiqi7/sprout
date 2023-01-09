package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/ruiqi7/web-forum/server/auth"
	"github.com/ruiqi7/web-forum/server/dataaccess"
	"github.com/ruiqi7/web-forum/server/database"
	"github.com/ruiqi7/web-forum/server/models"
)

// Solution adapted from https://www.sohamkamani.com/golang/jwt-authentication/
func SignIn(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	id, err := dataaccess.GetUserID(database.GetDB(), user)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	tokenStr, err := auth.GenerateToken(id, user.Username)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	auth.SetCookie(w, tokenStr, 600)
}

func SignOut(w http.ResponseWriter, r *http.Request) {
	auth.SetCookie(w, "", -1)
}

// Solution adapted from https://stackoverflow.com/questions/72682230/golang-jwt-mapclaims-get-user-id
func GetUser(w http.ResponseWriter, r *http.Request) {
	claims := auth.GetClaims(w, r)
	if claims == nil {
		return
	}
	json.NewEncoder(w).Encode(claims.Username)
}
