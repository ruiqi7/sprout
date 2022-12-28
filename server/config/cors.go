package config

import (
	"net/http"
)

// Solution adapted from https://github.com/satellity/satellity/blob/bdd216d87491a449aaab538a9f8ee185648f1d11/internal/middlewares/constraint.go
func CORS(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Authorization")
			w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, DELETE, PUT")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
		}
		if r.Method == "OPTIONS" {
			return
		}
		handler.ServeHTTP(w, r)
	})
}
