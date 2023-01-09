package auth

import (
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/ruiqi7/web-forum/server/models"
)

var key = []byte("key")

// Solution adapted from https://blog.logrocket.com/jwt-authentication-go/#:~:text=Generating%20JWTs%20for%20authentication%20using,from%20an%20environment%20variables%20file%20(
func GenerateToken(id int, username string) (string, error) {
	claims := &models.Claims{
		ID:       id,
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(10 * time.Minute)),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, err := token.SignedString(key)
	if err != nil {
		return "", err
	}
	return tokenStr, nil
}

func verifyToken(tokenStr string) (*jwt.Token, error) {
	return jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, fmt.Errorf("Unauthorized")
		}
		return []byte(key), nil
	})
}

func VerifyAuth(endpointHandler func(w http.ResponseWriter, r *http.Request)) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("token")
		if err != nil {
			http.Error(w, "Missing Token", 401)
			return
		}

		tokenStr := cookie.Value
		token, err := verifyToken(tokenStr)

		if err != nil {
			http.Error(w, "Error Parsing Token", 401)
			return
		}

		if !token.Valid {
			http.Error(w, "Invalid Token", 401)
			return
		}

		endpointHandler(w, r)
	})
}

func SetCookie(w http.ResponseWriter, tokenStr string, maxAge int) {
	http.SetCookie(w, &http.Cookie{
		Name:   "token",
		Value:  tokenStr,
		MaxAge: maxAge,
	})
}

func GetClaims(w http.ResponseWriter, r *http.Request) *models.Claims {
	cookie, err := r.Cookie("token")
	if err != nil {
		http.Error(w, "Missing Token", 401)
		return nil
	}

	tokenStr := cookie.Value
	token, err := jwt.ParseWithClaims(tokenStr, &models.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(key), nil
	})
	if err != nil {
		http.Error(w, "Invalid Token", 401)
		return nil
	}

	return token.Claims.(*models.Claims)
}
