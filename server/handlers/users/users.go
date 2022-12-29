package users

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/ruiqi7/web-forum/server/dataaccess/users"
	"github.com/ruiqi7/web-forum/server/database"
	"github.com/ruiqi7/web-forum/server/models"
)

type CustomClaims struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

var key = []byte("key")

// Solution adapted from https://blog.logrocket.com/jwt-authentication-go/#:~:text=Generating%20JWTs%20for%20authentication%20using,from%20an%20environment%20variables%20file%20(
func generateJWT(id int, username string) (string, error) {
	claims := &CustomClaims{
		ID:       id,
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(15 * time.Minute)),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, err := token.SignedString(key)
	if err != nil {
		return "", err
	}
	return tokenStr, nil
}

func verifyJWT(tokenStr string) (*jwt.Token, error) {
	return jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, fmt.Errorf("Invalid signing method!")
		}
		return []byte(key), nil
	})
}

func VerifyAuth(endpointHandler func(w http.ResponseWriter, r *http.Request)) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("token")
		if err != nil {
			w.Write([]byte("Missing token!"))
			return
		}

		tokenStr := cookie.Value
		token, err := verifyJWT(tokenStr)

		if err != nil {
			w.Write([]byte("Error parsing token!"))
			return
		}

		if !token.Valid {
			w.Write([]byte("Invalid token!"))
			return
		}

		endpointHandler(w, r)
	})
}

// Solution adapted from https://www.sohamkamani.com/golang/jwt-authentication/
func SignIn(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	id, err := users.GetUserID(database.GetDB(), user)
	database.CheckError(err)

	tokenStr, err := generateJWT(id, user.Username)
	database.CheckError(err)

	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenStr,
		Expires: time.Now().Add(15 * time.Minute),
	})
}

func SignOut(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Expires: time.Now().Add(-15 * time.Minute),
	})
}

// Solution adapted from https://stackoverflow.com/questions/72682230/golang-jwt-mapclaims-get-user-id
func GetUser(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("token")
	database.CheckError(err)

	tokenStr := cookie.Value
	token, err := jwt.ParseWithClaims(tokenStr, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(key), nil
	})
	database.CheckError(err)

	claims := token.Claims.(*CustomClaims)
	json.NewEncoder(w).Encode(claims.Username)
}
