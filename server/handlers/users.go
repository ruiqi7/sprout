package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/ruiqi7/sprout/server/auth"
	"github.com/ruiqi7/sprout/server/dataaccess"
	"github.com/ruiqi7/sprout/server/database"
	"github.com/ruiqi7/sprout/server/models"
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

	tokenStr, expiry, err := auth.GenerateToken(id, user.Username)
	if err != nil {
		http.Error(w, http.StatusText(500), 500)
		return
	}

	auth.SetCookie(w, tokenStr, expiry)
}

func SignOut(w http.ResponseWriter, r *http.Request) {
	auth.SetCookie(w, "", time.Now().Add(-1*time.Minute))
}

// Solution adapted from https://stackoverflow.com/questions/72682230/golang-jwt-mapclaims-get-user-id
func GetUser(w http.ResponseWriter, r *http.Request) {
	claims := auth.GetClaims(w, r)
	if claims == nil {
		return
	}
	json.NewEncoder(w).Encode(claims.Username)
}
