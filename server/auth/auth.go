package auth

import (
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/ruiqi7/web-forum/server/models"
)

var key = []byte("key")

// Solution adapted from
// https://blog.logrocket.com/jwt-authentication-go/#:~:text=Generating%20JWTs%20for%20authentication%20using,from%20an%20environment%20variables%20file%20(
// https://www.sohamkamani.com/golang/jwt-authentication/
func GenerateToken(id int, username string) (string, time.Time, error) {
	expiry := time.Now().Add(10 * time.Minute)
	claims := &models.Claims{
		ID:       id,
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiry),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenStr, err := token.SignedString(key)
	if err != nil {
		return "", expiry, err
	}
	return tokenStr, expiry, nil
}

func verifyToken(tokenStr string) (*jwt.Token, *models.Claims, error) {
	claims := &models.Claims{}
	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, fmt.Errorf("Unauthorized")
		}
		return key, nil
	})
	return token, claims, err
}

func VerifyAuth(endpoint func(w http.ResponseWriter, r *http.Request)) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("token")
		if err != nil {
			http.Error(w, "Missing Token", 401)
			return
		}

		tokenStr := cookie.Value
		token, claims, err := verifyToken(tokenStr)

		if err != nil {
			http.Error(w, "Error Parsing Token", 401)
			return
		}

		if !token.Valid {
			http.Error(w, "Invalid Token", 401)
			return
		}

		if time.Until(claims.ExpiresAt.Time) < 30*time.Second {
			tokenStr, expiry, err := GenerateToken(claims.ID, claims.Username)
			if err != nil {
				http.Error(w, "Token Not Renewed", 500)
				return
			}
			SetCookie(w, tokenStr, expiry)
		}

		endpoint(w, r)
	})
}

func SetCookie(w http.ResponseWriter, tokenStr string, expiry time.Time) {
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenStr,
		Expires: expiry,
		Path:    "/",
	})
}

func GetClaims(w http.ResponseWriter, r *http.Request) *models.Claims {
	cookie, err := r.Cookie("token")
	if err != nil {
		http.Error(w, "Missing Token", 401)
		return nil
	}

	tokenStr := cookie.Value
	_, claims, err := verifyToken(tokenStr)
	if err != nil {
		http.Error(w, "Invalid Token", 401)
		return nil
	}

	return claims
}
